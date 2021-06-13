import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardViewDosComponent } from './articulo-card-view-dos.component';

describe('ArticuloCardViewDosComponent', () => {
  let component: ArticuloCardViewDosComponent;
  let fixture: ComponentFixture<ArticuloCardViewDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardViewDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardViewDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
