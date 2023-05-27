import { TestBed } from '@angular/core/testing';

import { IdentityLoadedGuard } from './identity-loaded.guard';

describe('IdentityLoadedGuard', () => {
  let guard: IdentityLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IdentityLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
