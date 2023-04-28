import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LocalService } from 'src/app/services/local/local.service';
import { ToastrService } from 'ngx-toastr';

export interface Fruit {
  name: string;
}

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
    id: new FormControl(''),
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
  tags: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(fruit: Fruit): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editTag(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeTag(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }

}