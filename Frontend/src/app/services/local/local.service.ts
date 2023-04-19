import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {
  
  urlBackend2: string = "http://localhost:4000/locals/"

  constructor(
    private http:HttpClient
  ) { }

  getLocals(){
    return this.http.get(this.urlBackend2+"getLocals");
  }
}
