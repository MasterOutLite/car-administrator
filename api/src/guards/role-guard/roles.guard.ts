import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";
import {Roles} from "@src/guards/role-guard/roles.decorator";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private jwtService: JwtService,) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    console.log(roles);
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      //console.log(authHeader)
      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException();
      }

      console.log('verify')
      const decodedToken = this.jwtService.verify(token) as { role: string[] };
      request.user = decodedToken;
      console.log(request.user)

      return decodedToken.role.some(role => roles.includes(role));

    } catch (e) {
      console.log(e)
      throw new UnauthorizedException();
    }
  }
}
