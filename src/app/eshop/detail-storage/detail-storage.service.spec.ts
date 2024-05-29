import { TestBed } from '@angular/core/testing';

import { DetailStorageService } from './detail-storage.service';

describe('DetailStorageService', () => {
  let service: DetailStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
