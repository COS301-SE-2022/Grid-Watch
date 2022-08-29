import { InternalNode } from './internal-node';
import { Tree } from './tree';
import {Node} from './node';
import { DivNode } from './div-node';
import { LeafNode } from './leaf-node';
import { PlusNode } from './plus-node';
import { multNode } from './mult-node';

describe('Tree', () => {
  const numbers = [[5,1,1,1,2,1,3,1,1],
                [5,4,4,5,7,10,3,2,1],
                [3,1,1,1,2,2,3,1,1],
                [6,8,8,1,3,4,3,7,1],
                [4,1,1,3,2,1,3,1,1]];
    const expected = [0,0,0,0,0];
  it('should be defined', () => {
    expect(new Tree(2,[[1]],[2])).toBeDefined();
  });

  it('Generate random tree',async ()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    expect(await tree.generateRandTree()).toBeDefined();
  })

  it('randomInt should return value between 0 and 3',()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    expect(tree.randomInt(0,3)).toBeLessThanOrEqual(3);
  })

  it('getRandTerminal should return a minNode',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    for(let i=0;i<100;i++){
      const test: Node = await tree.getRandTerminal();
      if(await  test.getType()=="min"){
        expect(await test.getType()).toEqual('min');
      }
    }
  })

  it('getRandTerminal should return a plusNode',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    for(let i=0;i<100;i++){
      const test: Node = await tree.getRandTerminal();
      if(await  test.getType()=="plus"){
        expect(await test.getType()).toEqual('plus');
      }
    }
  })

  it('getRandTerminal should return a divNode',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    for(let i=0;i<100;i++){
      const test: Node = await tree.getRandTerminal();
      if(await  test.getType()=="div"){
        expect(await test.getType()).toEqual('div');
      }
    }
  })

  it('getRandTerminal should return a multNode',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    for(let i=0;i<100;i++){
      const test: Node = await tree.getRandTerminal();
      if(await  test.getType()=="mult"){
        expect(await test.getType()).toEqual('mult');
      }
    }
  })

  it('getRandNode should return a LeafNode',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    for(let i=0;i<10;i++){
      const node : Node = await tree.getRandNode(5);
      if(await node.getType() == "leaf"){
        expect(await node.getType()).toEqual("leaf");
      }
    }
  })

  it('getRandNode should return a InternalNode',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    for(let i=0;i<10;i++){
      const node : Node = await tree.getRandNode(5);
      if(await node.getType() != "leaf"){
        expect(await node.getType()).not.toEqual("leaf");
      }
    }
  })

  it('getArr should return array of Nodes',async()=>{
    const rootNode: Node = new DivNode(new LeafNode(12),new PlusNode(new LeafNode(9),new multNode(new LeafNode(2),new LeafNode(6))));
    const tree: Tree = new Tree(6,numbers,expected);
    const testarr : Node[]=[];
    await tree.getArr(rootNode,testarr);
    expect(testarr).toEqual([{"depth": NaN, "val": 12}, {"leftNode": {"depth": NaN, "val": 12}, "rightNode": {"depth": NaN, "leftNode": {"depth": NaN, "val": 9}, "rightNode": {"depth": NaN, "leftNode": {"depth": NaN, "val": 2}, "rightNode": {"depth": NaN, "val": 6}}}}, {"depth": NaN, "val": 9}, {"depth": NaN, "leftNode": {"depth": NaN, "val": 9}, "rightNode": {"depth": NaN, "leftNode": {"depth": NaN, "val": 2}, "rightNode": {"depth": NaN, "val": 6}}}, {"depth": NaN, "val": 2}, {"depth": NaN, "leftNode": {"depth": NaN, "val": 2}, "rightNode": {"depth": NaN, "val": 6}}, {"depth": NaN, "val": 6}]);
  })

  it('generateRandNode should  return random tree',async()=>{
    const rootNode: Node = new DivNode(null,null);
    const testNode: Node = await rootNode.clone();
    rootNode.setDepth(0);
    const tree: Tree = new Tree(6,numbers,expected);
    await tree.generateRandNode(rootNode);
    expect(rootNode).not.toEqual(testNode);
  })
});
