import { TestBed } from '@angular/core/testing';

import { EmtailorDataService } from './emtailor-data.service';

describe('EmtailorDataService', () => {
  let service: EmtailorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmtailorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
