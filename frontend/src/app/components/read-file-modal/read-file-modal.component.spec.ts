import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFileModalComponent } from './read-file-modal.component';

describe('ReadFileModalComponent', () => {
  let component: ReadFileModalComponent;
  let fixture: ComponentFixture<ReadFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadFileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
