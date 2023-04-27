import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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

  localForm = new FormGroup({
    id: new FormControl(this.local._id),
    name: new FormControl(this.local.name, Validators.required),
    email: new FormControl(this.local.email, [Validators.required, Validators.email]),
    password: new FormControl(this.local.password, Validators.required),
    address: new FormControl(this.local.address, Validators.required),
    description: new FormControl(this.local.description, Validators.required),
    phone: new FormControl(this.local.phone, Validators.required),
    isActive: new FormControl(this.local.isActive, Validators.required),
    tags: new FormControl(this.local.tags, Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public local: any,
    private dialogRef: MatDialogRef<LocalEditComponent>
  ) { }

  cancelEdit() {
    this.dialogRef.close({
      value: false
    })
  }

  confirmEdit() {
    // closing itself and sending data to parent component
    this.dialogRef.close({
      value: true,
      localValue: this.localForm.value,
    })
  }

  //TODO ESTO FALTA DESARROLLAR
  //------------------------------CHIP------------------------------//
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = this.local.tags;

  addTag(event: MatChipInputEvent): void {
    const valueTag = (event.value || '').trim();
    // Add our fruit
    if (valueTag) {
      this.tags.push({ value: valueTag });
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


