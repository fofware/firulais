import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoLinkSetComponent } from './producto-link-set.component';

describe('ProductoLinkSetComponent', () => {
  let component: ProductoLinkSetComponent;
  let fixture: ComponentFixture<ProductoLinkSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoLinkSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoLinkSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
