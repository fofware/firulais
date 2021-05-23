import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloFormAddModalComponent } from './articulo-form-add-modal.component';

describe('ArticuloFormAddModalComponent', () => {
  let component: ArticuloFormAddModalComponent;
  let fixture: ComponentFixture<ArticuloFormAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloFormAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloFormAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
