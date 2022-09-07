import { GP } from './gp';
import {Node} from './node';

describe('GP', () => {
const numbers = [[5,1,1,1,2,1,3,1,1],
                [5,4,4,5,7,10,3,2,1],
                [3,1,1,1,2,2,3,1,1],
                [6,8,8,1,3,4,3,7,1],
                [4,1,1,3,2,1,3,1,1]]
  const expected = [50,10,20,90,10]
  const test = new GP(10,6,20,numbers,expected);
  it('Test whole GP', async () => {
    expect(await test.GPA()).toBeDefined();
  });

  it('getInitial should generate an initial populaiton',async()=>{
    await test.getInitial();
    expect(test.population).not.toEqual(null);
  })
});
