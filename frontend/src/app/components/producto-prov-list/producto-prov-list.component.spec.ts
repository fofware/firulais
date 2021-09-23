import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoProvListComponent } from './producto-prov-list.component';

describe('ProductoProvListComponent', () => {
  let component: ProductoProvListComponent;
  let fixture: ComponentFixture<ProductoProvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoProvListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoProvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
