import { Logger, Module } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [
    AuthService,
    Logger /*,{
        provide: 'APP_GUARD',
        useClass: AuthGuard
    }*/,
  ],
  controllers: [AuthController],
})
export class AuthModule {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {
    this.logger.log("Auth module loaded", "AuthModule");
  }
}
