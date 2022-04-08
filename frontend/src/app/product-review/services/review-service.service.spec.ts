/* Authored by Rutu Joshi, B00897744, rt296393@dal.ca */
import { TestBed } from '@angular/core/testing';

import { ReviewServiceService } from './review-service.service';

describe('ReviewServiceService', () => {
  let service: ReviewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
