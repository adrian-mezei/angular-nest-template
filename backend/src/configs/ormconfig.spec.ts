import getTypeOrmConfig from './ormconfig';

describe('Ormconfig', () => {
    describe('getTypeOrmConfig', () => {
        it('should return a configuration object', async () => {
            const typeOrmConfig = await getTypeOrmConfig;
            expect(typeOrmConfig).toBeDefined();
        });
    });
});
