import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardViewGuestFullComponent } from './articulo-card-view-guest-full.component';

describe('ArticuloCardViewGuestFullComponent', () => {
  let component: ArticuloCardViewGuestFullComponent;
  let fixture: ComponentFixture<ArticuloCardViewGuestFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardViewGuestFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardViewGuestFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
