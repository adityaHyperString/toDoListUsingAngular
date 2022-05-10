import { TestBed } from '@angular/core/testing';

import { CommonFunctionServiceService } from './common-function-service.service';

describe('CommonFunctionServiceService', () => {
  let service: CommonFunctionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonFunctionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
