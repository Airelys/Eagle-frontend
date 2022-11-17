import { TestBed } from '@angular/core/testing';

import { SolveModelService } from './solve-model.service';

describe('SolveModelService', () => {
  let service: SolveModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolveModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
