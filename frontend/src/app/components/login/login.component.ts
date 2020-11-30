import { Component, OnInit, Optional } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { LoginService } from '../../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteValues } from 'src/app/app-routing.module';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public url = this.loginService.getGoogleAuthUrl();
    faSpinner = faSpinner;

    constructor(private loginService: LoginService, @Optional() private themeService?: ThemeService) {}

    ngOnInit(): void {}
}
