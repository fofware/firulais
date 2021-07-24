import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosReventaPrintComponent } from './articulos-reventa-print.component';

describe('ArticulosReventaPrintComponent', () => {
  let component: ArticulosReventaPrintComponent;
  let fixture: ComponentFixture<ArticulosReventaPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosReventaPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosReventaPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
