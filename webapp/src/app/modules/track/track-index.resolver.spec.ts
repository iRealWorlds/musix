import { TestBed } from '@angular/core/testing';

import { TrackIndexResolver } from './track-index.resolver';

describe('TrackIndexResolver', () => {
  let resolver: TrackIndexResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TrackIndexResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
