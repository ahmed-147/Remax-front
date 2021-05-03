import { TestBed } from '@angular/core/testing';

import { SearchitemService } from './searchitem.service';

describe('SearchitemService', () => {
  let service: SearchitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
