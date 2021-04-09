import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardSelectToolsComponent } from './articulo-card-select-tools.component';

describe('ArticuloCardSelectToolsComponent', () => {
  let component: ArticuloCardSelectToolsComponent;
  let fixture: ComponentFixture<ArticuloCardSelectToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardSelectToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardSelectToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
