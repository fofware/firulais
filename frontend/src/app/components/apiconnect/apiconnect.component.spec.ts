import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiconnectComponent } from './apiconnect.component';

describe('ApiconnectComponent', () => {
  let component: ApiconnectComponent;
  let fixture: ComponentFixture<ApiconnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiconnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
