import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosPreciosPrintComponent } from './articulos-precios-print.component';

describe('ArticulosPreciosPrintComponent', () => {
  let component: ArticulosPreciosPrintComponent;
  let fixture: ComponentFixture<ArticulosPreciosPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosPreciosPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosPreciosPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
