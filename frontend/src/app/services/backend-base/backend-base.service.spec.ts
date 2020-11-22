import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';

import { BackendBaseService } from './backend-base.service';

describe('BackendBaseService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
    });

    it('should be created', () => {
        const service: BackendBaseService = TestBed.inject(AuthService);
        expect(service).toBeTruthy();
    });
});
