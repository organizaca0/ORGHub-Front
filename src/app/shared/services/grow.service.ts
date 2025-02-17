import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { EnviromentResponse } from '../interfaces/Enviroment.interface';
import { Grow } from '../interfaces/Grow.interface';
import { EnviromentSetup } from '../interfaces/EnviromentSetup.interface';

@Injectable({
  providedIn: 'root',
})
export class GrowService {
  private baseUrl = enviroment.api_url;
  private eventSource!: EventSource;

  constructor(private http: HttpClient) {}

  getGrows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orgrow/grows`);
  }

  createGrow(grow:Grow):Observable<any>{
    return this.http.post(`${this.baseUrl}/orgrow/create`, grow);
  }

  updateGrow(alias:String, updatedGrow:Grow){
    return this.http.put(`${this.baseUrl}/orgrow/update/${alias}`, updatedGrow);
  }

  deleteGrow(alias:String){
    return this.http.delete(`${this.baseUrl}/orgrow/delete/${alias}`, { observe: 'response' });
  }

  getGrowByAlias(alias: String):Observable<any>{
    return this.http.get(`${this.baseUrl}/orgrow/grow/${alias}`);
  }

  changeStatus(alias:string, status:string): Observable<any>{
    return this.http.patch(`${this.baseUrl}/orgrow/change-status/${alias}/${status}`, null);
  }

  getEnviromentDataByPeriod(alias: string, period: number): Observable<EnviromentResponse[]> {
    return this.http.get<EnviromentResponse[]>(`${this.baseUrl}/enviroment/get-data/${alias}/${period}`);
  }  

  getIncidentsByPeriod(alias:string, period:number):Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/enviroment/get-incidents/${alias}/${period}`);
  }

  getSetup(alias: String){
    return this.http.get(`${this.baseUrl}/enviroment/get-setup/${alias}`);
  }

  setSetup(setup:EnviromentSetup){
    return this.http.post(`${this.baseUrl}/enviroment/setup`, setup);
  }

  createReport(alias: string, startDate: string, endDate: string): void {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDateConverted = start.toISOString();
    const endDateConverted = end.toISOString();

    this.http
      .get(
        `${this.baseUrl}/report/generate/${alias}?startDate=${startDateConverted}&endDate=${endDateConverted}`,
        {
          responseType: 'blob',
        }
      )
      .subscribe((response: Blob) => {
        const url = window.URL.createObjectURL(response);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.csv'; 
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error downloading the file', error);
      });
  }

  getEnviromentData(alias: string): Observable<EnviromentResponse> {
    const eventSource = new EventSource(`${this.baseUrl}/enviroment/status/${alias}`); 

    return new Observable<EnviromentResponse>(observer => {
      eventSource.onmessage = (event) => {
        const data: EnviromentResponse = JSON.parse(event.data); 

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
