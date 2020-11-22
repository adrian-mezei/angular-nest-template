import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendBaseService } from '../backend-base/backend-base.service';

const serviceBasePath = '/auth';

const enum AuthPaths {
    GOOGLE_AUTH = '/google',
}

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BackendBaseService {
    constructor(http: HttpClient) {
        super(http, serviceBasePath);
    }

    getGoogleAuthUrl(): string {
        return `${this.basePath}${AuthPaths.GOOGLE_AUTH}`;
    }
}
