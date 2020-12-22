import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './../login/login.service';

import { BackendBaseService } from './backend-base.service';

describe('BackendBaseService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
    });

    it('should be created', () => {
        const service: BackendBaseService = TestBed.inject(LoginService);
        expect(service).toBeTruthy();
    });
});
