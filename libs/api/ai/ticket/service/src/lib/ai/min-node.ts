import { InternalNode } from "./internal-node";
import { Node } from './node'

class MinNode extends InternalNode {

    constructor(left : Node, right : Node){
        super(left , right);
    }

    async clone() : Promise<Node> {
        const out : Node = new MinNode(await this.leftNode.clone(),await this.rightNode.clone());
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

