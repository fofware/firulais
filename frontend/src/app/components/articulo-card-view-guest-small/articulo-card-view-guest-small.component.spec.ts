import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardViewGuestSmallComponent } from './articulo-card-view-guest-small.component';

describe('ArticuloCardViewGuestSmallComponent', () => {
  let component: ArticuloCardViewGuestSmallComponent;
  let fixture: ComponentFixture<ArticuloCardViewGuestSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardViewGuestSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardViewGuestSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
