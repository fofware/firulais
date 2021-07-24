import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosReventaComponent } from './articulos-reventa.component';

describe('ArticulosReventaComponent', () => {
  let component: ArticulosReventaComponent;
  let fixture: ComponentFixture<ArticulosReventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosReventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosReventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
