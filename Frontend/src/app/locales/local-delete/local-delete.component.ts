import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-local-delete',
  templateUrl: './local-delete.component.html',
  styleUrls: ['./local-delete.component.css']
})
export class LocalDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public local: any,
    private localService : LocalService,
    private toast : ToastrService
  ){}

  confirmDelete(localID : Number) {
    this.localService.deleteLocal(localID)
    this.toast.error("Local eliminado");   
  }

}
