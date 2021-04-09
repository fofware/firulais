import { TestBed } from '@angular/core/testing';

import { ListasArtProdService } from './listas-art-prod.service';

describe('ListasArtProdService', () => {
  let service: ListasArtProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListasArtProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
