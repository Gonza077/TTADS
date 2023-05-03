import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LocalService } from 'src/app/services/local/local.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-local-edit',
  templateUrl: './local-edit.component.html',
  styleUrls: ['./local-edit.component.css']
})
export class LocalEditComponent {

  localForm = new FormGroup({
    _id: new FormControl(this.local._id),
    name: new FormControl(this.local.name, Validators.required),
    email: new FormControl(this.local.email, [Validators.required, Validators.email]),
    address: new FormControl(this.local.address, Validators.required),
    description: new FormControl(this.local.description, Validators.required),
    phone: new FormControl(this.local.phone, Validators.required),
    isActive: new FormControl(this.local.isActive, Validators.required),
    tags: new FormControl(this.local.tags, Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public local: any,
    private localService : LocalService,
    private toast : ToastrService
  ) { }

  editLocal() {
    if (this.localForm.valid){
      this.toast.success("Local editado con exito");
      this.localService.editLocal(this.localForm);
    }
  }

  //------------------------------CHIP------------------------------//
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = this.local.tags;
  
  addTag(event: MatChipInputEvent): void {
    const valueTag = (event.value || '').trim();
    // Add our fruit
    if (valueTag) {
      this.tags.push(valueTag);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: String): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editTag(tag: String, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeTag(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }
  //------------------------------CHIP------------------------------//
}


