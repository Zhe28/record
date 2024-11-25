/*
https://docs.nestjs.com/guards#guards
*/

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
  // 自动注入函数
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 获取 headers 的内容 , 并从中提取 token
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // Token 如果不存在则效果为未授权, 错误抛出
    if (!token) throw new UnauthorizedException();
    try {
      request.user = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const authorization = request.headers["authorization"];
    const [type, token] = authorization?.split(" ") ?? [];
    return type.toLowerCase() === "bearer" ? token : null;
  }
}
