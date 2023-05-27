import { GuestGuard } from 'src/auth/guest.guard';

describe('GuestGuard', () => {
  it('should be defined', () => {
    expect(new GuestGuard()).toBeDefined();
  });
});
