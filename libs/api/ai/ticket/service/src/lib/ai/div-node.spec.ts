import { async } from 'rxjs';
import { DivNode } from './div-node';
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
    const divNode : Node = new DivNode(new PlusNode(null,null),new MinNode(null,null));
    expect(await divNode.clone()).toMatchObject(divNode);
  })
});
