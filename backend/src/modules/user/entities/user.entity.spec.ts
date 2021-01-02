import { User } from './user.entity';

describe('User', () => {
    it('should be defined', () => {
        const user = new User();
        expect(user).toBeDefined();
    });

    describe('hashPassword', () => {
        it('should update the password field value', async () => {
            const user = new User();
            const userPlainPassword = 'test';

            user.password = userPlainPassword;
            await user.hashPassword();
            const userHashedPassword = user.password;

            expect(userPlainPassword).not.toEqual(userHashedPassword);
        });
    });

    describe('comparePassword', () => {
        it('should return true on good password', async () => {
            const user = new User();
            const userPlainPassword = 'test';

            user.password = userPlainPassword;
            await user.hashPassword();

            const success = await user.comparePassword(userPlainPassword);
            expect(success).toBeTruthy();
        });

        it('should return false on bad password', async () => {
            const user = new User();

            user.password = 'test';
            await user.hashPassword();

            const success = await user.comparePassword('something-else');
            expect(success).toBeFalsy();
        });
    });
});
