import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCardSelectPesoComponent } from './producto-card-select-peso.component';

describe('ProductoCardSelectPesoComponent', () => {
  let component: ProductoCardSelectPesoComponent;
  let fixture: ComponentFixture<ProductoCardSelectPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoCardSelectPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCardSelectPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
