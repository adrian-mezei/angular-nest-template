import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BackendBaseService } from '../backend-base/backend-base.service';

const serviceBasePath = '/auth';

const enum AuthPaths {
    GOOGLE_AUTH = '/google',
    GOOGLE_AUTH_CALLBACK = '/google/callback',
}

@Injectable({
    providedIn: 'root',
})
export class LoginService extends BackendBaseService {
    constructor(http: HttpClient) {
        super(http, serviceBasePath);
    }

    getGoogleAuthUrl(): string {
        return `${this.basePath}${AuthPaths.GOOGLE_AUTH}`;
    }

    googleAuthCallback(params: Params): Promise<HttpResponse<any>> {
        return this.http
            .get<any>(`${this.basePath}${AuthPaths.GOOGLE_AUTH_CALLBACK}`, { params, observe: 'response' })
            .toPromise<HttpResponse<any>>();
    }
}
