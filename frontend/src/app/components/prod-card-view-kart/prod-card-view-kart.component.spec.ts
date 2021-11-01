import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCardViewKartComponent } from './prod-card-view-kart.component';

describe('ProdCardViewKartComponent', () => {
  let component: ProdCardViewKartComponent;
  let fixture: ComponentFixture<ProdCardViewKartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdCardViewKartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdCardViewKartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
