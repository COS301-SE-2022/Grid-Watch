import { DivNode } from './div-node';
import { InternalNode } from './internal-node';

describe('InternalNode', () => {
  it('should be defined', () => {
    expect(new InternalNode(null,null)).toBeDefined();
  });

  it('clone should return null',async ()=>{
    const internalNode : InternalNode = new InternalNode(null,null);
    expect(await internalNode.clone()).toEqual(null);
  })

  it('testing setFitness, getFitness functions',async ()=>{
    const internalNode : InternalNode = new InternalNode(null,null);
    internalNode.setFitness(12);
    expect(await internalNode.getFitness()).toEqual(12);
  })

  it('testing setDepth, getDepth functions',async ()=>{
    const internalNode : InternalNode = new InternalNode(null,null);
    internalNode.setDepth(12);
    expect(await internalNode.getDepth()).toEqual(12);
  })

  it('testing setLeft, left functions',async ()=>{
    const internalNode : InternalNode = new InternalNode(null,null);
    const divNode : DivNode = new DivNode(null,null);
    internalNode.setLeft(divNode);
    expect(await internalNode.left()).toEqual(divNode);
  })

  it('testing setRight, right functions',async ()=>{
    const internalNode : InternalNode = new InternalNode(null,null);
    const divNode : DivNode = new DivNode(null,null);
    internalNode.setRight(divNode);
    expect(await internalNode.right()).toEqual(divNode);
  })

  it('execute should return 0',async ()=>{
    const internalNode : InternalNode = new InternalNode(null,null);
    expect(await internalNode.execute()).toEqual(0);
  })

});

describe('InternalNode integration testing',()=>{
  it('should be defined for div-node',()=>{
    const internalNode: InternalNode = new DivNode(null,null);
    expect(internalNode).toBeDefined();
  })
})
