import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BackendBaseService {
    private backendBasePath = '/api';
    protected basePath = `${this.backendBasePath}${this.serviceBasePath}`;

    constructor(protected http: HttpClient, private serviceBasePath: string) {}

    callApi<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: object): Observable<T> {
        switch (method) {
            case 'GET':
                return this.http.get<T>(path);
            case 'POST':
                return this.http.post<T>(path, body);
            case 'PUT':
                return this.http.put<T>(path, body);
            case 'DELETE':
                return this.http.delete<T>(path, body);
        }
    }
}
