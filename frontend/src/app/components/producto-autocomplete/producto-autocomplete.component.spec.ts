import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAutocompleteComponent } from './producto-autocomplete.component';

describe('ProductoAutocompleteComponent', () => {
  let component: ProductoAutocompleteComponent;
  let fixture: ComponentFixture<ProductoAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
