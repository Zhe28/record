# Token 认证与无感刷新登录实现

## 1. JWT Token 认证流程

### 1.1 基本概念

JWT (JSON Web Token) 是一个开放标准，它定义了一种紧凑且自包含的方式，用于在各方之间安全地传输信息。JWT 由三部分组成：

- Header（头部）
- Payload（负载）
- Signature（签名）

### 1.2 实现步骤

#### 1.2.1 安装依赖

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local
```

#### 1.2.2 创建认证模块

```typescript
// auth.module.ts
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
```

#### 1.2.3 实现认证服务

```typescript
// auth.service.ts
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string) {
    return this.usersService.findOne(username);
  }

  async login(user: any) {
    return this.usersService.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    return this.usersService.refreshUserToken(refreshToken);
  }
}
```

## 2. 无感刷新登录实现

### 2.1 Token 生成

在 UsersService 中实现 token 生成和刷新方法：

```typescript
// users.service.ts
@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(user: IUser) {
    return {
      access_token: this.generateAccessToken(user),
      refresh_token: this.generateRefreshToken(user)
    };
  }

  private generateAccessToken(user: IUser) {
    return this.jwtService.sign(
      {
        username: user.username,
        userId: user.userId,
        type: "access"
      },
      {
        expiresIn: "15m" // 访问令牌有效期15分钟
      }
    );
  }

  private generateRefreshToken(user: IUser) {
    return this.jwtService.sign(
      {
        username: user.username,
        userId: user.userId,
        type: "refresh"
      },
      {
        expiresIn: "7d" // 刷新令牌有效期7天
      }
    );
  }

  async refreshUserToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      if (payload.type !== "refresh") {
        throw new UnauthorizedException("Invalid token type");
      }

      const user = await this.findOne(payload.username);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      return {
        access_token: this.generateAccessToken(user)
      };
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
```

### 2.2 自动刷新拦截器

创建一个拦截器来自动处理 token 刷新：

```typescript
// token-refresh.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UsersService } from "../users/users.service";

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(
      catchError(async error => {
        // 捕获未授权错误
        if (error instanceof UnauthorizedException) {
          const request = context.switchToHttp().getRequest();
          const refreshToken = request.headers["refresh-token"];

          if (refreshToken) {
            try {
              // 尝试刷新 token
              const result =
                await this.usersService.refreshUserToken(
                  refreshToken
                );
              const response = context.switchToHttp().getResponse();

              // 在响应头中设置新的 token
              response.setHeader(
                "Authorization",
                `Bearer ${result.access_token}`
              );

              // 返回新的 token
              return result;
            } catch (refreshError) {
              // 如果刷新失败，继续抛出原始错误
              throw error;
            }
          }
        }
        throw error;
      })
    );
  }
}
```

### 2.3 前端实现

在前端需要实现自动刷新 token 的逻辑：

```typescript
// axios 拦截器配置
axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    config.headers["refresh-token"] = refreshToken;
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const { data } = await axios.post("/auth/refresh", {
            refresh_token: refreshToken
          });

          localStorage.setItem("access_token", data.access_token);

          // 重试原始请求
          const config = error.config;
          config.headers.Authorization = `Bearer ${data.access_token}`;
          return axios(config);
        } catch (refreshError) {
          // 刷新令牌也失效，需要重新登录
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          // 重定向到登录页
        }
      }
    }
    return Promise.reject(error);
  }
);
```

## 3. 工作流程

1. 用户首次登录：

   - 调用登录接口获取 access_token 和 refresh_token
   - 前端存储这两个 token

2. 正常请求：

   - 在请求头中带上 access_token
   - 服务器验证 access_token 有效性

3. access_token 过期：

   - 服务器返回 401 错误
   - 前端拦截器捕获 401 错误
   - 使用 refresh_token 请求新的 access_token
   - 使用新的 access_token 重试原始请求

4. refresh_token 过期：
   - 刷新 token 请求失败
   - 清除本地存储的 token
   - 重定向到登录页面

## 4. 安全考虑

1. Token 存储：

   - access_token 可以存储在 localStorage 或 内存中
   - refresh_token 最好存储在 httpOnly cookie 中

2. Token 有效期：

   - access_token 建议 15-30 分钟
   - refresh_token 建议 7-14 天

3. Token 携带信息：

   - 不要在 token 中存储敏感信息
   - 只存储必要的用户标识信息

4. 传输安全：
   - 使用 HTTPS 传输
   - 设置适当的 CORS 策略

## 5. 注意事项

1. 并发请求处理：

   - 多个请求同时失效时，只刷新一次 token
   - 其他请求等待刷新完成后继续

2. 错误处理：

   - 完善的错误提示
   - 合理的重试机制

3. 用户体验：

   - token 刷新过程对用户无感知
   - 登录过期时友好提示

4. 性能优化：
   - 合理设置 token 缓存
   - 避免频繁刷新 token
