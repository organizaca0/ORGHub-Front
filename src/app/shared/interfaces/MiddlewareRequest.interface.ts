type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface MiddlewareRequest {
    projectId: string;
    controllerId: string;
    httpMethod:HttpMethod;
    body?: any;
    parameters?: any[];
    queryParams?: { [key: string]: string | number };
}