import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router) {
      //sessionStorage.clear();
  }

  ngOnInit(): void { }

  loginUser() {
    if (this.loginForm.valid) {
      let userName = String(this.loginForm.value.name);
      let password = String(this.loginForm.value.password)
      this.userService.getUser(userName).subscribe((data: any) => {
        //Aca la contraseña tiene que estar hasheada para mayor seguridad
        if (data.password === password) {
          this.toastr.success("User Login succesfull!", data.id);
          this.router.navigate(["/home"]);
        }
        else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

  mostrarMensaje() {
    this.toastr.info("Era por abajo palacio", "2014")
  }
}
