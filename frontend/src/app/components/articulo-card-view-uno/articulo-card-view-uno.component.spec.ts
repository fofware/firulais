import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardViewUnoComponent } from './articulo-card-view-uno.component';

describe('ArticuloCardViewUnoComponent', () => {
  let component: ArticuloCardViewUnoComponent;
  let fixture: ComponentFixture<ArticuloCardViewUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardViewUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardViewUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
