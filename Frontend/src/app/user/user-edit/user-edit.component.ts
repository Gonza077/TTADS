import { Component, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    private toast :ToastrService
  ){ }

  userForm = new FormGroup({    
    name: new FormControl(this.user.name , Validators.required),
    password: new FormControl(this.user.password , Validators.required),
    address: new FormControl(this.user.address , ),
    gender: new FormControl(this.user.gender ,),
    registered:new FormControl({value:this.user.registered,disabled:true}, ),
    hideRequiredControl: new FormControl(this.user.isActive , ),
  });

  editUser(){
    //ACA IRIA EL SERVICIO
  }
}
