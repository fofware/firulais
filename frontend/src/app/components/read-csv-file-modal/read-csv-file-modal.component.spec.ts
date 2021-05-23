import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCsvFileModalComponent } from './read-csv-file-modal.component';

describe('ReadCsvFileModalComponent', () => {
  let component: ReadCsvFileModalComponent;
  let fixture: ComponentFixture<ReadCsvFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCsvFileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCsvFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
