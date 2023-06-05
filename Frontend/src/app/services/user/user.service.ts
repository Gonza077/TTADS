import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlBackend: string = "http://localhost:4000/api/users/";

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
    return this.http.get(this.urlBackend);
  }

  getUser(user: string) {
    return this.http.get(this.urlBackend +"user/"+ user);
  }

  RegisterUser(valueForm: any) {
    return this.http.post(this.urlBackend, valueForm)
  }

  editUser(valueForm: any) {
    return this.http.put(this.urlBackend + "update", valueForm.value).subscribe();
  }

  deleteUser(userID: any) {
    return this.http.delete(this.urlBackend + "delete/"+userID).subscribe();
  }

}
