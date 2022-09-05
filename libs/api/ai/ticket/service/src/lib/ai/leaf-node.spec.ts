import { LeafNode } from './leaf-node';

describe('LeafNode', () => {
  it('should be defined', () => {
    expect(new LeafNode(0)).toBeDefined();
  });

  it('getFitness should return -1.0',async ()=>{
    const leafNode : LeafNode = new LeafNode(0);
    expect(await leafNode.getFitness()).toEqual(-1.0);
  })

  it('Should be of type leaf',async ()=>{
    const leafNode = new LeafNode(0);
    expect(await leafNode.getType()).toEqual("leaf");
  })

  it('Should be an exact clone',async ()=>{
    const leafNode : LeafNode = new LeafNode(12);
    expect(await leafNode.clone()).toMatchObject(leafNode);
  })

  it('Executing the leafNode',async() =>{
    const leafNode : LeafNode = new LeafNode(2);
    expect(await leafNode.execute()).toEqual(2);
  })

  it('left should return null',async() =>{
    const leafNode : LeafNode = new LeafNode(2);
    expect(await leafNode.left()).toEqual(null);
  })

  it('right should return null',async() =>{
    const leafNode : LeafNode = new LeafNode(2);
    expect(await leafNode.right()).toEqual(null);
  })

  it('Test get and set depth',async() =>{
    const leafNode : LeafNode = new LeafNode(2);
    leafNode.setDepth(10);
    expect(await leafNode.getDepth()).toEqual(10);
  })
});
