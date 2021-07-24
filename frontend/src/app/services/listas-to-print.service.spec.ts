import { TestBed } from '@angular/core/testing';

import { ListasToPrintService } from './listas-to-print.service';

describe('ListasToPrintService', () => {
  let service: ListasToPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListasToPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
