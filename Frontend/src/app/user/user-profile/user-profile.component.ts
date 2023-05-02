import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileJSON:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private userID: any,
    private userService : UserService,
  ){}

  ngOnInit(): void {
    this.userService.getUser(this.userID).subscribe((data)=>{
      this.profileJSON = JSON.stringify(data,null,2);
    })
   
  }

}
