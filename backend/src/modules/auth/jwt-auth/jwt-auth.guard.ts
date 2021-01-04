import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public-decorator';
import { RoleName } from '../../role/role-name.enum';
import { ROLES_KEY } from '../../role/roles.decorator';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const canActivate = await super.canActivate(context);
        if (!canActivate) return false;

        const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;

        const user = context.switchToHttp().getRequest().user as User;
        if (!user) return false;

        const userHasRequiredRole = requiredRoles.some(requiredRole =>
            user.roles.find(userRole => userRole.name === requiredRole),
        );
        if (userHasRequiredRole) return true;

        return false;
    }
}
