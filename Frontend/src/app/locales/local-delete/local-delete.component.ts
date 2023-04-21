import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-local-delete',
  templateUrl: './local-delete.component.html',
  styleUrls: ['./local-delete.component.css']
})
export class LocalDeleteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public local: any ){}

}
