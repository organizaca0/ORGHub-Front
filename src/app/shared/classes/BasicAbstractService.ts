import { inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MiddlewareRequest } from "../interfaces/MiddlewareRequest.interface";
import { enviroment } from '../../../enviroment/enviroment';

export abstract class BasicAbstractService{
    protected abstract projectId: string;
    protected abstract controllerId:string;

    private baseUrl = enviroment.api_url;

    http = inject(HttpClient);

    createRequestToMiddleware(request: MiddlewareRequest): Observable<any> {
        let url = `${this.baseUrl}/${request.projectId}/${request.serviceId}`;
    
        if (request.parameters && request.parameters.length) {
            url += '/' + request.parameters.join('/');
        }
    
        if (request.queryParams) {
            const queryString = new URLSearchParams(request.queryParams as any).toString();
            url += `?${queryString}`;
        }
    
        switch (request.httpMethod.toLowerCase()) {
            case 'get':
                return this.http.get(url);
            case 'post':
                return this.http.post(url, request.body);
            case 'put':
                return this.http.put(url, request.body);
            case 'patch':
                return this.http.patch(url, request.body);
            case 'delete':
                return this.http.delete(url);
            default:
                throw new Error(`Unsupported HTTP method: ${request.httpMethod}`);
        }
    }
    
    createSseRequestToMiddleware(request: MiddlewareRequest): Observable<any> {
        let url = `${this.baseUrl}/${request.projectId}/${request.serviceId}`;
    
        if (request.parameters && request.parameters.length) {
            url += '/' + request.parameters.join('/');
        }
    
        if (request.queryParams) {
            const queryString = new URLSearchParams(request.queryParams as any).toString();
            url += `?${queryString}`;
        }
    
        const eventSource = new EventSource(url); 
    
        return new Observable<any>((observer) => {
            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data) {
                    observer.next(data);
                } else {
                    observer.error('Invalid data received from server');
                }
            };
    
            eventSource.onerror = (error) => {
                observer.error(error);
            };
    
            return () => {
                if (eventSource) {
                    eventSource.close();
                }
            };
        });
    }    
}