import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardViewReventaComponent } from './articulo-card-view-reventa.component';

describe('ArticuloCardViewReventaComponent', () => {
  let component: ArticuloCardViewReventaComponent;
  let fixture: ComponentFixture<ArticuloCardViewReventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardViewReventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardViewReventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
