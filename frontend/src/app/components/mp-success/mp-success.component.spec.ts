import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpSuccessComponent } from './mp-success.component';

describe('MpSuccessComponent', () => {
  let component: MpSuccessComponent;
  let fixture: ComponentFixture<MpSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
