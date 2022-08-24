import { DivNode } from './div-node';
import { InternalNode } from './internal-node';
import { LeafNode } from './leaf-node';
import { MinNode } from './min-node';
import { multNode } from './mult-node';
import { PlusNode } from './plus-node';

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

  it('should be defined for mult-node',()=>{
    const internalNode: InternalNode = new multNode(null,null);
    expect(internalNode).toBeDefined();
  })

  it('should be defined for PlusNode',()=>{
    const internalNode: InternalNode = new PlusNode(null,null);
    expect(internalNode).toBeDefined();
  })

  it('should be defined for minNode',()=>{
    const internalNode: InternalNode = new MinNode(null,null);
    expect(internalNode).toBeDefined();
  })

  it('internalNode should return div type',async()=>{
    const internalNode: InternalNode = new DivNode(null,null);
    expect(await internalNode.getType()).toEqual("div");
  })

  it('internalNode should return mult type',async()=>{
    const internalNode: InternalNode = new multNode(null,null);
    expect(await internalNode.getType()).toEqual("mult");
  })

  it('internalNode should return plus type',async()=>{
    const internalNode: InternalNode = new PlusNode(null,null);
    expect(await internalNode.getType()).toEqual("plus");
  })

  it('internalNode should return min type',async()=>{
    const internalNode: InternalNode = new MinNode(null,null);
    expect(await internalNode.getType()).toEqual("min");
  })

  it('internalNode should return div clone',async()=>{
    const internalNode : InternalNode = new DivNode(new PlusNode(new LeafNode(0),null),new multNode(null,new LeafNode(2)));
    expect(await internalNode.clone()).toEqual(internalNode);
  })

  it('internalNode should return mult clone',async()=>{
    const internalNode : InternalNode = new multNode(new PlusNode(new LeafNode(0),null),new multNode(null,new LeafNode(2)));
    expect(await internalNode.clone()).toEqual(internalNode);
  })

  it('internalNode should return plus clone',async()=>{
    const internalNode : InternalNode = new PlusNode(new PlusNode(new LeafNode(0),null),new multNode(null,new LeafNode(2)));
    expect(await internalNode.clone()).toEqual(internalNode);
  })

  it('internalNode should return min clone',async()=>{
    const internalNode : InternalNode = new MinNode(new PlusNode(new LeafNode(0),null),new multNode(null,new LeafNode(2)));
    expect(await internalNode.clone()).toEqual(internalNode);
  })
})
