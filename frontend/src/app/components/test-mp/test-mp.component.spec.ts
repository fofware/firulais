import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMpComponent } from './test-mp.component';

describe('TestMpComponent', () => {
  let component: TestMpComponent;
  let fixture: ComponentFixture<TestMpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestMpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
