import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(
    public userService : UserService,
  ) { }

  ngOnInit(): void {
  }

  loginUser(){
    console.log("Sesion iniciada");
  }

  signOffUser(){
    console.log("Sesion cerrada");
  }
}
