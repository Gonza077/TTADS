import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-local-delete',
  templateUrl: './local-delete.component.html',
  styleUrls: ['./local-delete.component.css']
})
export class LocalDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public local: any,
    private localService :LocalService
  ){}

  deleteLocal(localID : Number){
    this.localService.deleteLocal(localID);
  }
}
