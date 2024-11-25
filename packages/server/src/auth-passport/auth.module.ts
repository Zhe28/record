import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../auth-jwt/constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TokenRefreshInterceptor } from "./interceptors/token-refresh.interceptor";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: TokenRefreshInterceptor,
    },
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
})
export class AuthModule {}
