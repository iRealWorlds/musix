import { TestBed } from '@angular/core/testing';

import { TrackDetailsResolver } from './track-details.resolver';

describe('TrackDetailsResolver', () => {
  let resolver: TrackDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TrackDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
