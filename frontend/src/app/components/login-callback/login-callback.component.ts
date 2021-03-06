import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteValues } from '../../app-routing.module';
import { LoaderService } from '../../services/loader/loader.service';
import { LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-login-callback',
    templateUrl: './login-callback.component.html',
    styleUrls: ['./login-callback.component.css'],
})
export class LoginCallbackComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private loginService: LoginService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(async (params) => {
            try {
                this.loaderService.show();
                const response = await this.loginService.googleAuthCallback(params);
                localStorage.setItem('token', response.body.accessToken);
                this.router.navigate([RouteValues.HOME]);
            } catch (e) {
                this.router.navigate([RouteValues.LOGIN]);
            } finally {
                this.loaderService.hide();
            }
        });
    }
}
