import { LeafNode } from './leaf-node';
import { Node } from './node';
import { PlusNode } from './plus-node';
import {multNode} from './mult-node';

describe('multNode', () => {
  it('should be defined', () => {
    expect(new multNode(null,null)).toBeDefined();
  });

  it('Should be of type min',async ()=>{
    const mNode = new multNode(null,null);
    expect(await mNode.getType()).toEqual("mult");
  })

  it('Should be an exact clone',async ()=>{
    const mNode : Node = new multNode(new PlusNode(new LeafNode(5),null),new multNode(null,null));
    expect(await mNode.clone()).toMatchObject(mNode);
  })

  it('Clone tree without branches',async ()=>{
    const mNode : Node = new multNode(null,null);
    expect(await mNode.clone()).toMatchObject(mNode);
  })

  it('Executing the tree',async() =>{
    const mNode : Node = new multNode(new PlusNode(new LeafNode(12),new LeafNode(5)),new multNode(new LeafNode(-5),new LeafNode(5)));
    expect(await mNode.execute()).toEqual(-425);
  })
});
