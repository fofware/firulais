import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadXlsxFileModalComponent } from './read-xlsx-file-modal.component';

describe('ReadXlsxFileModalComponent', () => {
  let component: ReadXlsxFileModalComponent;
  let fixture: ComponentFixture<ReadXlsxFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadXlsxFileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadXlsxFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
