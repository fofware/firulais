import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPrintComponent } from './product-list-print.component';

describe('ProductListPrintComponent', () => {
  let component: ProductListPrintComponent;
  let fixture: ComponentFixture<ProductListPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
