import { TestBed } from '@angular/core/testing';

import { PublicVacationsService } from './public-vacations.service';

describe('PublicVacationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicVacationsService = TestBed.get(PublicVacationsService);
    expect(service).toBeTruthy();
  });
});
