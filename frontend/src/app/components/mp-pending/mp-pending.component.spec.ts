import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpPendingComponent } from './mp-pending.component';

describe('MpPendingComponent', () => {
  let component: MpPendingComponent;
  let fixture: ComponentFixture<MpPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
