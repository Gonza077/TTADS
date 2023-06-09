import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  urlBackend: string = "http://localhost:4000/api/locals/"

  constructor(
    private http: HttpClient
  ) { }

  getLocals() {
    return this.http.get(this.urlBackend);
  }

  getLocal(localID: any){
    return this.http.get(this.urlBackend+"/local?idLocal="+localID);
  }

  addLocal(localForm: any) {
    return this.http.post(this.urlBackend + "add", localForm.value).subscribe();
  }

  editLocal(localForm: any) {
    return this.http.put(this.urlBackend + "update", localForm.value).subscribe();
  }

  deleteLocal(localID: Number) {
    return this.http.delete(this.urlBackend + "delete/" + localID).subscribe();
  }

}
