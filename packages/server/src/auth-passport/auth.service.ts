import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

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
