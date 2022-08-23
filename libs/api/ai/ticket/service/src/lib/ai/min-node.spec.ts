import { LeafNode } from './leaf-node';
import { MinNode } from './min-node';
import { Node } from './node';
import { PlusNode } from './plus-node';

describe('MinNode', () => {
  it('should be defined', () => {
    expect(new MinNode(null,null)).toBeDefined();
  });

  it('Should be of type min',async ()=>{
    const minNode = new MinNode(null,null);
    expect(await minNode.getType()).toEqual("min");
  })

  it('Should be an exact clone',async ()=>{
    const minNode : Node = new MinNode(new PlusNode(new LeafNode(5),null),new MinNode(null,null));
    expect(await minNode.clone()).toMatchObject(minNode);
  })

  it('Clone tree without branches',async ()=>{
    const minNode : Node = new MinNode(null,null);
    expect(await minNode.clone()).toMatchObject(minNode);
  })

  it('Executing the tree',async() =>{
    const minNode : Node = new MinNode(new PlusNode(new LeafNode(12),new LeafNode(5)),new MinNode(new LeafNode(-5),new LeafNode(5)));
    expect(await minNode.execute()).toEqual(27);
  })
});
