import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteValues } from '../../app-routing.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        const token = localStorage.getItem('token');

        if (token === null) {
            this.router.navigate([RouteValues.LOGIN]);
        }
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.router.navigate([RouteValues.LOGIN]);
    }
}
