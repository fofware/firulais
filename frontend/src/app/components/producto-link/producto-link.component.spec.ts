import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoLinkComponent } from './producto-link.component';

describe('ProductoLinkComponent', () => {
  let component: ProductoLinkComponent;
  let fixture: ComponentFixture<ProductoLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
