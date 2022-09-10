import { Injectable } from "@nestjs/common";
import { Node } from "./node";
@Injectable()
export class InternalNode extends Node{
    leftNode :  Node;
    rightNode : Node;
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

    setDepth(depth : number){
        this.depth = depth;
    }

    getDepth(){
        return this.depth;
    }

    async setVal(val : number) : Promise<void> {
        //nothing
    }

    async setLeft(left : Node) : Promise<void> {
        this.leftNode = left;
        this.leftNode.setDepth(await this.getDepth()+1);
    }

    async setRight(right : Node) : Promise<void> {
        this.rightNode = right;
        this.rightNode.setDepth(await this.getDepth()+1);
    }

    constructor(left : Node, right : Node){
        super();
        this.leftNode = left;
        if(this.leftNode !=null){
            this.leftNode.setDepth(left.getDepth());
        }
        this.rightNode = right;
        if(this.rightNode != null){
            this.rightNode.setDepth(right.getDepth());
        }
    }

   async left() : Promise<Node> {
        return this.leftNode;
    }

    async right() : Promise<Node> {
        return this.rightNode;
    }

    async execute() : Promise<number> {
        return 0;
    }

}