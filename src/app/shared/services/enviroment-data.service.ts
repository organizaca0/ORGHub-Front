import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource: EventSource | null=null;
  private dataSubject = new Subject<any[]>();
  private baseUrl = enviroment.api_url;

  constructor() {}

  public connect(alias: string): void {
    this.eventSource = new EventSource(
      `${this.baseUrl}/enviroment/get-data/stream/${alias}`
    );

    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.dataSubject.next(data);
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      if(this.eventSource){
        this.eventSource.close();
      }
    };
  }

  public getData(): Subject<any[]> {
    return this.dataSubject;
  }

  public disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null; 
    }
  }
  
  get anyConnectionOpen(): boolean {
    return this.eventSource !== null; 
  }
}
