import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local/local.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-local-edit',
  templateUrl: './local-edit.component.html',
  styleUrls: ['./local-edit.component.css']
})
export class LocalEditComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public local: any,
    private localService: LocalService
  ) { }

  localForm = new FormGroup({
    id: new FormControl(this.local._id),
    company: new FormControl(this.local.company, Validators.required),
    email: new FormControl(this.local.email, [Validators.required, Validators.email]),
    password: new FormControl(this.local.password, Validators.required),
    address: new FormControl(this.local.address, Validators.required),
    description: new FormControl(this.local.description, Validators.required),
    phone: new FormControl(this.local.phone, Validators.required),
    tags: new FormControl(this.local.tags, Validators.required),
    isActive: new FormControl(this.local.isActive, Validators.required),
  });

  editLocal() {
    this.localService.editLocal(this.localForm.value);
  }

  //TODO ESTO FALTA DESARROLLAR
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
  //------------------------------CHIP------------------------------//
}


