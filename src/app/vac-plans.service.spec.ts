import { TestBed } from '@angular/core/testing';

import { VacPlansService } from './vac-plans.service';

describe('VacPlansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacPlansService = TestBed.get(VacPlansService);
    expect(service).toBeTruthy();
  });
});
