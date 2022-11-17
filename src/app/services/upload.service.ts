import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  apiUrl = 'http://127.0.0.1:8000/';
  urlUpload = '/api/UploadFile';

  constructor(private http:HttpClient) { }

  upload(file:File):Observable<any> {

    const formData = new FormData();

    formData.append("file", file, 'data.xlsx');

    return this.http.post(this.apiUrl+this.urlUpload, formData)
}
}
