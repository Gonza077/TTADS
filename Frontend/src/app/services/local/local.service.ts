import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {
  
  urlBackend: string = "http://localhost:4000/locals/"

  constructor(
    private http:HttpClient
  ) { }

  getLocals(){
    return this.http.get(this.urlBackend+"getLocals");
  }

  editLocal(localForm : any){
    return this.http.put(this.urlBackend+"updateLocal",localForm).subscribe();
  }

  deleteLocal(localID: Number){
    return this.http.delete(this.urlBackend + "deleteLocal/"+localID).subscribe();
  }
}
