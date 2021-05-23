import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCardViewListComponent } from './prod-card-view-list.component';

describe('ProdCardViewListComponent', () => {
  let component: ProdCardViewListComponent;
  let fixture: ComponentFixture<ProdCardViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdCardViewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdCardViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
