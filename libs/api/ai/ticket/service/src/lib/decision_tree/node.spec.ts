import { Node } from './node';

describe('Node', () => {
  it('should be defined', () => {
    expect(new Node(1,2,null,null,12,2)).toBeDefined();
  });
});
