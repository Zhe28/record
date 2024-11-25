import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IUser, UsersService } from "../../users/users.service";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.findOne(username);
    if (!user) return new UnauthorizedException("User not found");
    return user;
  }
}
