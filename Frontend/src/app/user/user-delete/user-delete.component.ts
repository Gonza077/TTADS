import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    private userService : UserService
    ){}

  deleteUser(userID : string){
    this.userService.deleteUser(userID);
  }

}
