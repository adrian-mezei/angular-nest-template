import { UserEntity } from './user.entity';

describe('UserEntity', () => {
    it('should be defined', () => {
        const user = new UserEntity();
        expect(user).toBeDefined();
    });

    describe('hashPassword', () => {
        it('should update the password field value', async () => {
            const user = new UserEntity();
            const userPlainPassword = 'test';

            user.password = userPlainPassword;
            await user.hashPassword();
            const userHashedPassword = user.password;

            expect(userPlainPassword).not.toEqual(userHashedPassword);
        });
    });

    describe('comparePassword', () => {
        it('should return true on good password', async () => {
            const user = new UserEntity();
            const userPlainPassword = 'test';

            user.password = userPlainPassword;
            await user.hashPassword();

            const success = await user.comparePassword(userPlainPassword);
            expect(success).toBeTruthy();
        });

        it('should return false on bad password', async () => {
            const user = new UserEntity();

            user.password = 'test';
            await user.hashPassword();

            const success = await user.comparePassword('something-else');
            expect(success).toBeFalsy();
        });
    });
});
