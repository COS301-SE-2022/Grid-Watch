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

  it('reconstruct should return a tree from json',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    const injson = [{
      "type": "div",
      "depth": 0,
      "fitness": null,
      "left": [{
          "type": "leaf",
          "depth": 1,
          "left": null,
          "right": null
      }],
      "right": [{
          "type": "mult",
          "depth": 1,
          "left": [{
              "type": "plus",
              "depth": 2,
              "left": [{
                  "type": "plus",
                  "depth": 3,
                  "left": [{
                      "type": "leaf",
                      "depth": 4,
                      "left": null,
                      "right": null
                  }],
                  "right": [{
                      "type": "min",
                      "depth": 4,
                      "left": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }],
                      "right": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }]
                  }]
              }],
              "right": [{
                  "type": "min",
                  "depth": 3,
                  "left": [{
                      "type": "mult",
                      "depth": 4,
                      "left": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }],
                      "right": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }]
                  }],
                  "right": [{
                      "type": "mult",
                      "depth": 4,
                      "left": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }],
                      "right": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }]
                  }]
              }]
          }],
          "right": [{
              "type": "div",
              "depth": 2,
              "left": [{
                  "type": "mult",
                  "depth": 3,
                  "left": [{
                      "type": "plus",
                      "depth": 4,
                      "left": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }],
                      "right": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }]
                  }],
                  "right": [{
                      "type": "plus",
                      "depth": 4,
                      "left": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }],
                      "right": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }]
                  }]
              }],
              "right": [{
                  "type": "plus",
                  "depth": 3,
                  "left": [{
                      "type": "min",
                      "depth": 4,
                      "left": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }],
                      "right": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }]
                  }],
                  "right": [{
                      "type": "plus",
                      "depth": 4,
                      "left": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }],
                      "right": [{
                          "type": "leaf",
                          "depth": 5,
                          "left": null,
                          "right": null
                      }]
                  }]
              }]
          }]
      }]
  }];
    expect(await tree.reconstruct(injson)).toEqual({"depth": 0, "leftNode": {"depth": 1, "val": 0}, "rightNode": {"depth": 1, "leftNode": {"depth": 2, "leftNode": {"depth": 3, "leftNode": {"depth": 4, "val": 0}, "rightNode": {"depth": 4, "leftNode": {"depth": 5, "val": 0}, "rightNode": {"depth": 5, "val": 0}}}, "rightNode": {"depth": 3, "leftNode": {"depth": 4, "leftNode": {"depth": 5, "val": 0}, "rightNode": {"depth": 5, "val": 0}}, "rightNode": {"depth": 4, "leftNode": {"depth": 5, "val": 0}, "rightNode": {"depth": 5, "val": 0}}}}, "rightNode": {"depth": 2, "leftNode": {"depth": 3, "leftNode": {"depth": 4, "leftNode": {"depth": 5, "val": 0}, "rightNode": {"depth": 5, "val": 0}}, "rightNode": {"depth": 4, "leftNode": {"depth": 5, "val": 0}, "rightNode": {"depth": 5, "val": 0}}}, "rightNode": {"depth": 3, "leftNode": {"depth": 4, "leftNode": {"depth": 5, "val": 0}, "rightNode": {"depth": 5, "val": 0}}, "rightNode": {"depth": 4, "leftNode": {"depth": 5, "val": 0}, "rightNode": {"depth": 5, "val": 0}}}}}});
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
    expect(testarr).toEqual([{"depth": undefined, "val": 12}, {"leftNode": {"depth": undefined, "val": 12}, "rightNode": {"depth": undefined, "leftNode": {"depth": undefined, "val": 9}, "rightNode": {"depth": undefined, "leftNode": {"depth": undefined, "val": 2}, "rightNode": {"depth": undefined, "val": 6}}}}, {"depth": undefined, "val": 9}, {"depth": undefined, "leftNode": {"depth": undefined, "val": 9}, "rightNode": {"depth": undefined, "leftNode": {"depth": undefined, "val": 2}, "rightNode": {"depth": undefined, "val": 6}}}, {"depth": undefined, "val": 2}, {"depth": undefined, "leftNode": {"depth": undefined, "val": 2}, "rightNode": {"depth": undefined, "val": 6}}, {"depth": undefined, "val": 6}]);
  })

  it('generateRandNode should  return random tree',async()=>{
    const rootNode: Node = new DivNode(null,null);
    const testNode: Node = await rootNode.clone();
    rootNode.setDepth(0);
    const tree: Tree = new Tree(6,numbers,expected);
    await tree.generateRandNode(rootNode);
    expect(rootNode).not.toEqual(testNode);
  })

 it('getRandLeafLevelNode should return a random leaf node',async()=>{
   const tree: Tree = new Tree(6,numbers,expected);
   const rootNode: Node = await tree.generateRandTree();
   const leafNode = await tree.getRandLeafLevelNode(rootNode);
   expect(await leafNode.getType()).toEqual("leaf");
 })
  
  it('populate tree should add values to leaf nodes',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    const rootNode: Node = await tree.generateRandTree();
    await tree.populateTree(rootNode);
    const leafNode = await tree.getRandLeafLevelNode(rootNode);
    const testNode = await leafNode.clone();
    testNode.setVal(-1);
    expect(leafNode).not.toEqual(testNode);
  })

  it('getRandLevelNode should return random internal node',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    const rootNode: Node = await tree.generateRandTree();
    await tree.populateTree(rootNode);
    const node: Node = await tree.getRandLevelNode(2,rootNode);
    expect(await node.getType()).toBeDefined();
  })

  it('crossOver should return a cross between parent1 and parent2', async()=>{
    const tree: Tree = new Tree(2,numbers,expected);
    const parent1: Node = await tree.generateRandTree();
    const parent2: Node = await tree.generateRandTree();
    await tree.populateTree(parent1);
    await tree. populateTree(parent2);
    expect(await tree.crossOver(parent1,parent2)).toBeDefined();
  })

  it('replaceNode should replace a node with specified node',async ()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    const rootNode: Node = await tree.generateRandTree();
    const testNode :Node = await rootNode.clone();
    await tree.populateTree(rootNode);
    const node: Node = await tree.getRandLevelNode(2,rootNode);
    const replaceNode: Node = await new DivNode(null,null);
    await tree.replaceNode(node,replaceNode,rootNode);
    expect(rootNode).not.toEqual(testNode);
  })

  it('mutation should return a mutated subtree', async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    const rootNode: Node = await tree.generateRandTree();
    await tree.populateTree(rootNode);
    expect(await tree.mutation(rootNode,4)).toBeDefined();
  })

  it('generateRandSubtree should return a random subtree', async()=>{
    const tree: Tree = new Tree(3,numbers,expected);
    const rootNode: Node = new DivNode(null,null);
    rootNode.setDepth(0);
    await tree.generateRandSubtree(rootNode,4);
    expect(rootNode).toBeDefined();
  })

  it('getLevels should return the depth of a tree', async() =>{
    const tree: Tree = new Tree(3,numbers,expected);
    const rootNode: Node = await tree.generateRandTree();
    await tree.populateTree(rootNode);
    expect(await tree.getLevels(rootNode)).toEqual(3);
  })

  it('getFitness should return a fitness value',async()=>{
    const tree: Tree = new Tree(6,numbers,expected);
    const rootNode: Node = await tree.generateRandTree();
    await tree.populateTree(rootNode);
    expect(await tree.getFitness(rootNode)).toBeGreaterThanOrEqual(0);
  })

});
