import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('AuthService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        }),
    );

    it('should be created', () => {
        const service: LoginService = TestBed.inject(LoginService);
        expect(service).toBeTruthy();
    });
});
