import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDeleteComponent } from './local-delete.component';

describe('LocalDeleteComponent', () => {
  let component: LocalDeleteComponent;
  let fixture: ComponentFixture<LocalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
