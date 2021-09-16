import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosListCardViewComponent } from './articulos-list-card-view.component';

describe('ArticulosListCardViewComponent', () => {
  let component: ArticulosListCardViewComponent;
  let fixture: ComponentFixture<ArticulosListCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosListCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosListCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
