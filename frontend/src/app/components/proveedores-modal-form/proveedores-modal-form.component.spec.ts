import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresModalFormComponent } from './proveedores-modal-form.component';

describe('ProveedoresModalFormComponent', () => {
  let component: ProveedoresModalFormComponent;
  let fixture: ComponentFixture<ProveedoresModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresModalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
