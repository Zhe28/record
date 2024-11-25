import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      userId: 1,
      username: "john",
      password: "changeme",
    },
    {
      userId: 2,
      username: "chris",
      password: "secret",
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async findOne(username: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async validateToken(token: string): Promise<IUser> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.findOne(payload.username);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
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
        access_token: this.generateAccessToken(user),
      };
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async generateTokens(user: IUser) {
    return {
      access_token: this.generateAccessToken(user),
      refresh_token: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: IUser) {
    return this.jwtService.sign(
      {
        username: user.username,
        userId: user.userId,
        type: "access",
      },
      {
        expiresIn: "15m",
      },
    );
  }

  private generateRefreshToken(user: IUser) {
    return this.jwtService.sign(
      {
        username: user.username,
        userId: user.userId,
        type: "refresh",
      },
      {
        expiresIn: "7d",
      },
    );
  }
}

export type IUser = {
  userId: number;
  username: string;
  password: string;
};
