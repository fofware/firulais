import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloLinkProductoComponent } from './articulo-link-producto.component';

describe('ArticuloLinkProductoComponent', () => {
  let component: ArticuloLinkProductoComponent;
  let fixture: ComponentFixture<ArticuloLinkProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloLinkProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloLinkProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
