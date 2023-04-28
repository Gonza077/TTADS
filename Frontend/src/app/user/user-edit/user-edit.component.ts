import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private user: any,
    private toast: ToastrService,
    private userService: UserService
  ) { }

  userForm = new FormGroup({
    _id: new FormControl(this.user._id),
    name: new FormControl(this.user.name, Validators.required),
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    password: new FormControl(this.user.password, Validators.required),
    address: new FormControl(this.user.address, Validators.required),
    gender: new FormControl(this.user.gender, Validators.required),
    age: new FormControl(this.user.age, Validators.required),
    phone: new FormControl(this.user.phone, Validators.required),
    isActive: new FormControl(this.user.isActive, Validators.required),
  });

  editUser() {
    if (this.userForm.valid){
      this.toast.success("Usuario editado");
      this.userService.editUser(this.userForm);
    }
  }
}
