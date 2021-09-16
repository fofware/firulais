import { TestBed } from '@angular/core/testing';

import { ListasProveedoresService } from './listas-proveedores.service';

describe('ListasProveedoresService', () => {
  let service: ListasProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListasProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
