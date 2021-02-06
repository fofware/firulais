import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardSelectComponent } from './articulo-card-select.component';

describe('ArticuloCardSelectComponent', () => {
  let component: ArticuloCardSelectComponent;
  let fixture: ComponentFixture<ArticuloCardSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
