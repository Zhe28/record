import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth-jwt/constants";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
