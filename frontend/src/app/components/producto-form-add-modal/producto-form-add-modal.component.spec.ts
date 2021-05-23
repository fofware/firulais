import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormAddModalComponent } from './producto-form-add-modal.component';

describe('ProductoFormAddModalComponent', () => {
  let component: ProductoFormAddModalComponent;
  let fixture: ComponentFixture<ProductoFormAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoFormAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFormAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
