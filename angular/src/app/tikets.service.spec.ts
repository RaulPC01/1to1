import { TestBed } from '@angular/core/testing';

import { TiketsService } from './tikets.service';

describe('TiketsService', () => {
  let service: TiketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
