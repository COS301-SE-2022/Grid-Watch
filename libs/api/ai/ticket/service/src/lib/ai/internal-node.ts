export class InternalNode extends Node{
    left :  Node;
    right : Node;
    depth : number;
    fitness : number;

    async clone() : Promise<Node> {
        return null;
    }

    async setFitness(fitness : number)  : Promise<void> {
        this.fitness = fitness;
    }

    async getFitness() : Promise<number>{
        return this.fitness;
    }

    async setDepth(depth : number):  Promise<void> {
        this.depth = depth;
    }

    async getDepth() : Promise<number> {
        return this.depth;
    }

    async setVal(val : number) : Promise<void> {
        //nothing
    }

    async setLeft(left : Node) : Promise<void> {
        this.left = left;
        this.left.setDepth(this.getDepth()+1);
    }

    async setRight(Node right) : Promise<void> {
        this.right = right;
        this.right.setDepth(this.getDepth()+1);
    }

    public InternalNode(Node left, Node right){
        this.left = left;
        this.left.setDepth(this.getDepth()+1);
        this.right = right;
        this.right.setDepth(this.getDepth()+1);
    }

    @Override
    public Node left() {
        return this.left;
    }

    @Override
    public Node right() {
        return this.right;
    }

    @Override
    public float execute() {
        return 0;
    }

}
