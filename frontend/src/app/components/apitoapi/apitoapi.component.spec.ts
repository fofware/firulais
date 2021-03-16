import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApitoapiComponent } from './apitoapi.component';

describe('ApitoapiComponent', () => {
  let component: ApitoapiComponent;
  let fixture: ComponentFixture<ApitoapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApitoapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApitoapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
