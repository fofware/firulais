import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardSelectHeaderComponent } from './articulo-card-select-header.component';

describe('ArticuloCardSelectHeaderComponent', () => {
  let component: ArticuloCardSelectHeaderComponent;
  let fixture: ComponentFixture<ArticuloCardSelectHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardSelectHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardSelectHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
