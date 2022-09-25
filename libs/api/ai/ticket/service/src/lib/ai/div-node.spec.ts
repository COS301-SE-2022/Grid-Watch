import { DivNode } from './div-node';
import { LeafNode } from './leaf-node';
import { MinNode } from './min-node';
import { Node } from './node';
import { PlusNode } from './plus-node';

describe('DivNode', () => {
  it('should be defined', () => {
    expect(new DivNode(null,null)).toBeDefined();
  });

  it('Should be of type div',async ()=>{
    const divNode = new DivNode(null,null);
    expect(await divNode.getType()).toEqual("div");
  })

  it('Should be an exact clone',async ()=>{
    const divNode : Node = new DivNode(new PlusNode(new LeafNode(5),null),new MinNode(null,null));
    expect(await divNode.clone()).toMatchObject(divNode);
  })

  it('Clone tree without branches',async ()=>{
    const divNode : Node = new DivNode(null,null);
    expect(await divNode.clone()).toMatchObject(divNode);
  })

  it('Try executing tree with invalid division',async ()=>{
    const divNode : Node = new DivNode(new LeafNode(15),new LeafNode(0))
    expect(await divNode.execute()).toEqual(1);
  })

  it('Executing the tree',async() =>{
    const divNode : Node = new DivNode(new PlusNode(new LeafNode(12),new LeafNode(5)),new MinNode(new LeafNode(-5),new LeafNode(5)));
    expect(await divNode.execute()).toEqual(-1.7);
  })
});
