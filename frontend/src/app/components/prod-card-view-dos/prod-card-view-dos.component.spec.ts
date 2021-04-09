import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCardViewDosComponent } from './prod-card-view-dos.component';

describe('ProdCardViewDosComponent', () => {
  let component: ProdCardViewDosComponent;
  let fixture: ComponentFixture<ProdCardViewDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdCardViewDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdCardViewDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
