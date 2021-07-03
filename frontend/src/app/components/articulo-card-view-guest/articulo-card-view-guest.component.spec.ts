import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardViewGuestComponent } from './articulo-card-view-guest.component';

describe('ArticuloCardViewGuestComponent', () => {
  let component: ArticuloCardViewGuestComponent;
  let fixture: ComponentFixture<ArticuloCardViewGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardViewGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardViewGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
