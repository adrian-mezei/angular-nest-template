import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Auth', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();
    });

    describe('Google login', () => {
        const path = '/auth/google';
        it(`GET ${path} should redirect with HTTP status 302`, () => {
            return request(app.getHttpServer()).get(path).expect(302);
        });
    });

    describe('Local login', () => {
        const path = '/auth/local/login';
        const body = { email: 'john.doe@gmail.com', password: 'MySecretPw' };

        it(`POST ${path} should login`, async () => {
            const res = await request(app.getHttpServer()).post(path).send(body);

            expect(res.statusCode).toEqual(200);
            expect(res.body.accessToken).toBeDefined();
            expect(res.body.user.email).toBe(body.email);
            expect(res.body.user.firstName).toBe('John');
            expect(res.body.user.lastName).toBe('Doe');
        });
    });
});
