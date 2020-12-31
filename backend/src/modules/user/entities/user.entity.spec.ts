import { UserEntity } from './user.entity';

describe('UserEntity', () => {
    it('should be defined', () => {
        const user = new UserEntity();
        expect(user).toBeDefined();
    });
});
