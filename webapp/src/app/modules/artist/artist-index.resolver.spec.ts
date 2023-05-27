import { TestBed } from '@angular/core/testing';

import { ArtistIndexResolver } from './artist-index.resolver';

describe('ArtistIndexResolver', () => {
  let resolver: ArtistIndexResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ArtistIndexResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
