import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCtrlComponent } from './browse-ctrl.component';

describe('BrowseCtrlComponent', () => {
  let component: BrowseCtrlComponent;
  let fixture: ComponentFixture<BrowseCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseCtrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
