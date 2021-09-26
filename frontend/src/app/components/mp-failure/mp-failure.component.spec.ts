import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpFailureComponent } from './mp-failure.component';

describe('MpFailureComponent', () => {
  let component: MpFailureComponent;
  let fixture: ComponentFixture<MpFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpFailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
