import { InternalNode } from "./internal-node";
import { Node } from "./node";

export class DivNode extends InternalNode{

    divNode(left : Node, right : Node){
        this.left = left;
        this.right = right;
    }
    
    getType() : string{
        return "div";
    }

    clone() : Node{
        let out :  Node = new divNode(this.left.clone(),this.right.clone());
        out.setDepth(this.depth);
        out.setFitness(this.getFitness());
        return out;
    }

    execute() : number {
        if(this.right.execute()==0){
            return 0;
        }else {
            return this.left.execute()/this.right.execute();
        }
    }
}
