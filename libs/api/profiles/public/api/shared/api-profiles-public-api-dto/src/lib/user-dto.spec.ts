import { UserDto } from './user-dto';

describe('ApiUserDto', () => {
  it('should be defined', () => {
    expect(new UserDto()).toBeDefined();
  });
});

