import { JwtWsAuthGuard } from './jwt-ws-auth.guard';

describe('JwtWsAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtWsAuthGuard()).toBeDefined();
  });
});
