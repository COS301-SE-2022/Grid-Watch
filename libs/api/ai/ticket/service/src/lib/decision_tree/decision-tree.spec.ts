import { DecisionTree } from './decision-tree';

describe('DecisionTree', () => {
  const input = [[5,1,1,1,2,1,3,1,1,1],
                [5,4,4,5,7,10,3,2,1,1],
                [3,1,1,1,2,2,3,1,1,1],
                [6,8,8,1,3,4,3,7,1,1],
                [4,1,1,3,2,1,3,1,1,1]]

  it('Decision tree should return a fitted value of 1', () => {
    const decision:DecisionTree = new DecisionTree(3,3);
    decision.fit(input);
    expect(decision.make_prediction([5,1,1,1,2,1,3,1,1],decision.root)).toEqual(1);
  });

  it('Calculate variance',()=>{
    const input = [-14.82381293, -0.29423447, -13.56067979, -1.6288903, -0.31632439,
      0.53459687, -1.34069996, -1.61042692, -4.03220519, -0.24332097];
      const decision = new DecisionTree(3,3);
      expect(decision.variance(input)).toEqual(28.822364260579157);
  })
});

