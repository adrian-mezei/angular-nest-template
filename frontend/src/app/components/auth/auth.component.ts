import { Component, OnInit, Optional } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    public url = this.authService.getGoogleAuthUrl();

    constructor(private authService: AuthService, @Optional() private themeService?: ThemeService) {}

    ngOnInit() {}
}
