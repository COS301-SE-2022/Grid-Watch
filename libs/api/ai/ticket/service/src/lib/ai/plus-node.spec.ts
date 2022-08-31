import { DivNode } from './div-node';
import { LeafNode } from './leaf-node';
import { multNode } from './mult-node';
import { Node } from './node';
import { PlusNode } from './plus-node';

describe('PlusNode', () => {
  it('should be defined', () => {
    expect(new PlusNode(null,null)).toBeDefined();
  });

  it('Should be of type min',async ()=>{
    const plusNode = new PlusNode(null,null);
    expect(await plusNode.getType()).toEqual("plus");
  })

  it('Should be an exact clone',async ()=>{
    const plusNode : Node = new PlusNode(new DivNode(new LeafNode(5),null),new PlusNode(null,null));
    expect(await plusNode.clone()).toMatchObject(plusNode);
  })

  it('Clone tree without branches',async ()=>{
    const plusNode : Node = new PlusNode(null,null);
    expect(await plusNode.clone()).toMatchObject(plusNode);
  })

  it('Executing the tree',async() =>{
    const plusNode : Node = new PlusNode(new DivNode(new LeafNode(12),new LeafNode(5)),new multNode(new LeafNode(-5),new LeafNode(5)));
    expect(await plusNode.execute()).toEqual(-22.6);
  })
});
