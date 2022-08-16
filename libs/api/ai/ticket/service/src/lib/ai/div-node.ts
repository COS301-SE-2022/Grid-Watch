import { InternalNode } from "./internal-node";
import { Node } from "./node";

export class DivNode extends InternalNode{

    constructor(left : Node, right : Node){
        super(left , right);

    }
    
    async getType() : Promise<string>{
        return "div";
    }

    async clone() : Promise<Node>{
        let out :  Node = new divNode(this.leftNode.clone(),this.rightNode.clone());
        out.setDepth(this.depth);
        out.setFitness(this.getFitness());
        return out;
    }

    async execute() : Promise<number> {
        if(this.rightNode.execute()==0){
            return 0;
        }else {
            return this.leftNode.execute()/this.rightNode.execute();
        }
    }
}
