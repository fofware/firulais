import { TestBed } from '@angular/core/testing';

import { ArticulosLinkService } from './articulos-link.service';

describe('ArticulosLinkService', () => {
  let service: ArticulosLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
