import { RoleEntity } from './role.entity';

describe('RoleEntity', () => {
    it('should be defined', () => {
        const user = new RoleEntity();
        expect(user).toBeDefined();
    });
});
