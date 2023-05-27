import { TestBed } from '@angular/core/testing';

import { ArtistDetailsResolver } from './artist-details.resolver';

describe('ArtistDetailsResolver', () => {
  let resolver: ArtistDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ArtistDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
