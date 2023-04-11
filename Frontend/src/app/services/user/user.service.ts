import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlBackend: string = "http://localhost:3000/users/";
  user$!: Observable<true>;

  constructor(
    private http: HttpClient) {
  }

  //Esto deberia ser con alguna propiedad seteada del usuario
  isLoggin(){
    return true;
  }

  isAdmin(){
    return true;
  }

  getUser(userName: string) {
    return this.http.get(this.urlBackend+userName);
  }

  getUsers(){
    return this.http.get(this.urlBackend)
  }

  RegisterUser(valueForm: any) {
    return this.http.post(this.urlBackend, valueForm)
  }
}
