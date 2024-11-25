import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UsersService } from "../../users/users.service";

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(async (error) => {
        if (error instanceof UnauthorizedException) {
          const request = context.switchToHttp().getRequest();
          const refreshToken = request.headers["refresh-token"];

          if (refreshToken) {
            try {
              const result = await this.usersService.refreshUserToken(refreshToken);
              const response = context.switchToHttp().getResponse();
              response.setHeader("Authorization", `Bearer ${result.access_token}`);
              return result;
            } catch (refreshError) {
              throw error;
            }
          }
        }
        throw error;
      }),
    );
  }
}
