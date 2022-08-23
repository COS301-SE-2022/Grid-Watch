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
        let out : Node = null;
        if(this.leftNode != null && this.rightNode !=null){
            out = new DivNode(await this.leftNode.clone(),await this.rightNode.clone());
        }else if (this.leftNode != null){
            out = new DivNode(await this.leftNode.clone(),null);
        }else if(this.rightNode !=null){
            out = new DivNode(null,await this.rightNode.clone());
        }else{
            return null;
        }
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
