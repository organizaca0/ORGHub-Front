import { inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GatewayRequest } from "../interfaces/GatewayRequest.interface";
import { enviroment } from '../../../enviroment/enviroment';

export abstract class BasicAbstractService{
    protected abstract projectId: string;
    protected abstract controllerId:string;

    private baseUrl = enviroment.api_url;

    http = inject(HttpClient);

    createRequestToMiddleware(request: GatewayRequest): Observable<any> {
        return this.http.post(this.baseUrl, request);
    }
    
    createSseRequestToMiddleware(request: GatewayRequest): Observable<any> {
        let url = `${this.baseUrl}/${request.projectId}/${request.controllerId}`;
    
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