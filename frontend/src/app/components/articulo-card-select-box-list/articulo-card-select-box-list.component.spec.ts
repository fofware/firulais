import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardSelectBoxListComponent } from './articulo-card-select-box-list.component';

describe('ArticuloCardSelectBoxListComponent', () => {
  let component: ArticuloCardSelectBoxListComponent;
  let fixture: ComponentFixture<ArticuloCardSelectBoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardSelectBoxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardSelectBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
