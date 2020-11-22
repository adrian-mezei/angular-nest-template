import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config/config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private title = 'angular-nest-template';

    constructor(private configService: ConfigService) {}

    ngOnInit() {}
}
