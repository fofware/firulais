import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloPagoSelectComponent } from './articulo-pago-select.component';

describe('ArticuloPagoSelectComponent', () => {
  let component: ArticuloPagoSelectComponent;
  let fixture: ComponentFixture<ArticuloPagoSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloPagoSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloPagoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
