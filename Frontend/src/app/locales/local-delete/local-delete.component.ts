import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-local-delete',
  templateUrl: './local-delete.component.html',
  styleUrls: ['./local-delete.component.css']
})
export class LocalDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public local: any,
    private dialogRef: MatDialogRef<LocalDeleteComponent>
  ){}

  cancelEdit() {
    this.dialogRef.close({
      value: false
    })
  }

  confirmDelete(localID : Number) {
    // closing itself and sending data to parent component
    this.dialogRef.close({
      value: true,
      localID: localID,
    })
  }

}
