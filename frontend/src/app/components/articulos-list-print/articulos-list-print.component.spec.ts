import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosListPrintComponent } from './articulos-list-print.component';

describe('ArticulosListPrintComponent', () => {
  let component: ArticulosListPrintComponent;
  let fixture: ComponentFixture<ArticulosListPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosListPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
