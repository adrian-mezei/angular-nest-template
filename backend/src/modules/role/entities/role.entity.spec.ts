import { Role } from './role.entity';

describe('Role', () => {
    it('should be defined', () => {
        const user = new Role();
        expect(user).toBeDefined();
    });
});
