import { TestBed } from '@angular/core/testing';

import { DatabasecommsService } from './databasecomms.service';

describe('DatabasecommsService', () => {
  let service: DatabasecommsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabasecommsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
