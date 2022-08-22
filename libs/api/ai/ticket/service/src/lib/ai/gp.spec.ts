import { GP } from './gp';
import {Node} from './node';

describe('GP', () => {
const numbers = [[5,1,1,1,2,1,3,1,1],
                [5,4,4,5,7,10,3,2,1],
                [3,1,1,1,2,2,3,1,1],
                [6,8,8,1,3,4,3,7,1],
                [4,1,1,3,2,1,3,1,1]]
  const expected = [0,0,0,0,0]
  const test = new GP(200,5,30,numbers,expected);
  it('Test whole GP', () => {
    expect(test.GPA()).toEqual(5);
  });
});
