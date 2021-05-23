import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAutocompleteComponent } from './personas-autocomplete.component';

describe('PersonasAutocompleteComponent', () => {
  let component: PersonasAutocompleteComponent;
  let fixture: ComponentFixture<PersonasAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonasAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
