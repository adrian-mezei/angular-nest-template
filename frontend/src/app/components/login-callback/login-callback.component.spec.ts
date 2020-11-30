import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginCallbackComponent } from './login-callback.component';

describe('LoginCallbackComponent', () => {
    let component: LoginCallbackComponent;
    let fixture: ComponentFixture<LoginCallbackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [LoginCallbackComponent],
            providers: [Overlay],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginCallbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
