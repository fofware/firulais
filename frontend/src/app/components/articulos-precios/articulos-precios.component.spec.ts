import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosPreciosComponent } from './articulos-precios.component';

describe('ArticulosPreciosComponent', () => {
  let component: ArticulosPreciosComponent;
  let fixture: ComponentFixture<ArticulosPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
