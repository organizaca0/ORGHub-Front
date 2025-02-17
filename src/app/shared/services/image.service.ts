import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly imageKey = 'profilePic';

  constructor(private http: HttpClient) {}

  fetchAndStoreImage(url: string): Observable<void> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          localStorage.setItem(this.imageKey, base64String);
        };
        reader.readAsDataURL(blob);
        return;
      })
    );
  }

  getImage(): string {
    let image =  localStorage.getItem(this.imageKey);
    if(image){
        return image;
    }
    return "";
  }

  clearImage(): void {
    localStorage.removeItem(this.imageKey);
  }
}
