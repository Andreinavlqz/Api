import { TestBed } from '@angular/core/testing';

import { ThemoviesdbService } from './themoviesdb.service';

describe('ThemoviesdbService', () => {
  let service: ThemoviesdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemoviesdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
