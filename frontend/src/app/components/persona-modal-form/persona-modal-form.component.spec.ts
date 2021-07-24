import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaModalFormComponent } from './persona-modal-form.component';

describe('PersonaModalFormComponent', () => {
  let component: PersonaModalFormComponent;
  let fixture: ComponentFixture<PersonaModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaModalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
