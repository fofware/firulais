import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormEditComponent } from './producto-form-edit.component';

describe('ProductoFormEditComponent', () => {
  let component: ProductoFormEditComponent;
  let fixture: ComponentFixture<ProductoFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoFormEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
