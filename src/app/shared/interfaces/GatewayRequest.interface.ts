type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface GatewayRequest {
    projectId: string;
    controllerId: string;
    httpMethod:HttpMethod;
    body?: any;
    parameters?: any[];
    queryParams?: { [key: string]: string | number };
}