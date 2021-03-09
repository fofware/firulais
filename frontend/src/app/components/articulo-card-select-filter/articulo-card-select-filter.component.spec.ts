import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardSelectFilterComponent } from './articulo-card-select-filter.component';

describe('ArticuloCardSelectFilterComponent', () => {
  let component: ArticuloCardSelectFilterComponent;
  let fixture: ComponentFixture<ArticuloCardSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardSelectFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
