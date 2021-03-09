import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargalistasComponent } from './cargalistas.component';

describe('CargalistasComponent', () => {
  let component: CargalistasComponent;
  let fixture: ComponentFixture<CargalistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargalistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargalistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
