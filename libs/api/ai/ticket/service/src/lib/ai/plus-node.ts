import { InternalNode } from "./internal-node";
import { Node } from "./node";

export class PlusNode extends InternalNode{
    constructor(left : Node, right: Node){
        super(left, right);
    }

    async clone() : Promise<Node> {
        const out : Node = new PlusNode(await this.leftNode.clone(),await this.rightNode.clone());
        out.setDepth(this.depth);
        out.setFitness(await this.getFitness());
        return out;
    }

    async getType() : Promise<string>{
        return "plus";
    }
    
    async execute() : Promise<number> {
        return await this.leftNode.execute()+ await this.rightNode.execute();
    }
}

