import { TestBed } from '@angular/core/testing';

import { FuncService } from './func.service';

describe('UserService', () => {
  let service: FuncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
