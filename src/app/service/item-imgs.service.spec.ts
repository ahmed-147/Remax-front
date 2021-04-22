import { TestBed } from '@angular/core/testing';

import { ItemImgsService } from './item-imgs.service';

describe('ItemImgsService', () => {
  let service: ItemImgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemImgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
