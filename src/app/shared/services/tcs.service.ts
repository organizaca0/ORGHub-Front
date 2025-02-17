import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TcsService {

  constructor() {}

  getClientAlias() {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts.length > 2) {
      return parts[1]; 
    }
    return null; 
  }
}
