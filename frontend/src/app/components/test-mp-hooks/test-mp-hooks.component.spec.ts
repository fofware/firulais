import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMpHooksComponent } from './test-mp-hooks.component';

describe('TestMpHooksComponent', () => {
  let component: TestMpHooksComponent;
  let fixture: ComponentFixture<TestMpHooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestMpHooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMpHooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
