import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardSelectOrderComponent } from './articulo-card-select-order.component';

describe('ArticuloCardSelectOrderComponent', () => {
  let component: ArticuloCardSelectOrderComponent;
  let fixture: ComponentFixture<ArticuloCardSelectOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardSelectOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardSelectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
