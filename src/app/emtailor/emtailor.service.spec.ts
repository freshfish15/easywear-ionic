import { TestBed } from '@angular/core/testing';

import { EmtailorService } from './emtailor.service';

describe('EmtailorService', () => {
  let service: EmtailorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmtailorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
