import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    // password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
  })

  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService) {
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.service.RegisterUser(this.registerForm.value).subscribe(result => {
        this.toastr.success('Please contact admin for enable access.', 'Registered successfully')
        this.router.navigate(['/login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}