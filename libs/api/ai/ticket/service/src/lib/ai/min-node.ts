import { InternalNode } from "./internal-node";
import { Node } from './node'

export class MinNode extends InternalNode {

    constructor(left : Node, right : Node){
        super(left , right);
    }

    async clone() : Promise<Node> {
        let out : Node = null;
        if(this.leftNode != null && this.rightNode !=null){
            out = new MinNode(await this.leftNode.clone(),await this.rightNode.clone());
        }else if (this.leftNode != null){
            out = new MinNode(await this.leftNode.clone(),null);
        }else if(this.rightNode !=null){
            out = new MinNode(null,await this.rightNode.clone());
        }else{
            return null;
        }
        out.setDepth(this.depth);
        out.setFitness(await this.getFitness());
        return out;
    }

    async getType() : Promise<string> {
        return "min";
    }

    async execute() : Promise<number>{
        return await this.leftNode.execute()-await this.rightNode.execute();
    }
}

