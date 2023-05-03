import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LocalService } from 'src/app/services/local/local.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-local-add',
  templateUrl: './local-add.component.html',
  styleUrls: ['./local-add.component.css']
})
export class LocalAddComponent {

  constructor(
    private localService: LocalService,
    private toast : ToastrService
  ){}

  localForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    address: new FormControl('', Validators.required),
    description: new FormControl('', ),
    phone: new FormControl('',Validators.required),
    isActive: new FormControl(false),
  });

  confirmCreate(){
    if (this.localForm.valid){
      this.localService.addLocal(this.localForm);
      this.toast.success("Local agregado con exito")
    }
  }

  //------------------------------CHIP------------------------------//
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];
  
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
