import { Component, OnInit, Optional } from '@angular/core';
import { ThemeService } from './../../services/theme/theme.service';
import { LoginService } from './../../services/login/login.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
