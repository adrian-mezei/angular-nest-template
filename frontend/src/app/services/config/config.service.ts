import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigModel } from '../../../models/config/ConfigModel';
import { BackendBaseService } from '../backend-base/backend-base.service';

const serviceBasePath = '/frontendConfig';

@Injectable({
    providedIn: 'root',
})
export class ConfigService extends BackendBaseService {
    constructor(http: HttpClient) {
        super(http, serviceBasePath);
    }

    public getConfig() {
        return this.callApi<ConfigModel>(this.basePath, 'GET');
    }
}
