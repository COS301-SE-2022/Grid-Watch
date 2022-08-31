import { Injectable } from "@nestjs/common";
import { Node } from "./node";
@Injectable()
export class LeafNode extends Node{

    val : number;
    depth : number;

    async setFitness(fitness: number) : Promise<void>{
        return;
    }

    async getFitness() : Promise<number> {
       return -1.0;
    }

    async clone() : Promise<Node> {
        const out : Node = new LeafNode(0);
        await out.setVal(this.val);
        await out.setDepth(this.depth);
        return out;
    }

    async getType() : Promise<string> {
        return "leaf";
    }

    async getDepth() : Promise<number> {
        return this.depth;
    }

    async setDepth(depth : number) : Promise<void> {
        this.depth = depth;
    }

    constructor(val : number){
        super();
        this.val=val;
    }

    async setVal(val : number) : Promise<void> {
        this.val = val;
    }

    async right() : Promise<Node> {
        return null;
    }

    async setLeft(left : Node): Promise<void> {
        return;
    }

    async setRight(right : Node) : Promise<void>{
        return;
    }

    async left() : Promise<Node> {
        return null;
    }

    async execute(): Promise<number> {
        return this.val;
    }
}

