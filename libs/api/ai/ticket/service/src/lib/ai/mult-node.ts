import { InternalNode } from "./internal-node";
import { Node } from "./node";

export class multNode extends InternalNode {

    constructor(left : Node, right : Node){
        super(left, right);
    }
    
    async clone() : Promise<Node> {
        let out : Node = null;
        if(this.leftNode != null && this.rightNode !=null){
            out = new multNode(await this.leftNode.clone(),await this.rightNode.clone());
        }else if (this.leftNode != null){
            out = new multNode(await this.leftNode.clone(),null);
        }else if(this.rightNode !=null){
            out = new multNode(null,await this.rightNode.clone());
        }else{
            out = new multNode(null,null);
        }
        out.setDepth(this.depth);
        out.setFitness(await this.getFitness());
        return out;
    }

    async getType() : Promise<string> {
        return "mult";
    }

    async execute() : Promise<number> {
        return await this.leftNode.execute()* await this.rightNode.execute();
    }
}


