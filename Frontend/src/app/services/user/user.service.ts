import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlBackend: string = "http://localhost:4000/users/";

  constructor(
    private http: HttpClient) {
  }

  //Esto deberia ser con alguna propiedad seteada del usuario
  isLoggin() {
    return true;
  }

  isAdmin() {
    return true;
  }

  getUsers() {
    return this.http.get(this.urlBackend + "getUsers");
  }

  getUser(userName: string) {
    return this.http.get(this.urlBackend + userName);
  }

  RegisterUser(valueForm: any) {
    return this.http.post(this.urlBackend, valueForm)
  }

  editUser(valueForm: any) {
    console.log(valueForm.value)
    return this.http.put(this.urlBackend + "updateUser", valueForm.value)
  }

}
