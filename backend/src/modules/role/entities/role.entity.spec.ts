import { RoleName } from '../role-name.enum';
import { Role } from './role.entity';

describe('Role', () => {
    it('should be defined', () => {
        const user = new Role(RoleName.USER);
        expect(user).toBeDefined();
    });
});
