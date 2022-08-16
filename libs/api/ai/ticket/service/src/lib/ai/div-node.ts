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
        const out :  Node = new DivNode(await this.leftNode.clone(),await this.rightNode.clone());
        out.setDepth(this.depth);
        out.setFitness(await this.getFitness());
        return out;
    }

    async execute() : Promise<number> {
        if(await this.rightNode.execute()==0){
            return 0;
        }else {
            return await this.leftNode.execute()/await this.rightNode.execute();
        }
    }
}
