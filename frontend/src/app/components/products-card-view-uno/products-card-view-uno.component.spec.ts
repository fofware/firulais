import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCardViewUnoComponent } from './products-card-view-uno.component';

describe('ProductsCardViewUnoComponent', () => {
  let component: ProductsCardViewUnoComponent;
  let fixture: ComponentFixture<ProductsCardViewUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsCardViewUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCardViewUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
