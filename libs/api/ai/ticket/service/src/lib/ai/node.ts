import { Injectable } from "@nestjs/common";

@Injectable()
export class Node {
    async execute(): Promise<number>{ return 0.0;} 
    async left() : Promise<Node> {return null;};
    async right() : Promise<Node> {return null;};
    async setLeft(left : Node): Promise<void> {return;};
    async setRight(right : Node) : Promise<void>{return;};
    async setVal(val : number): Promise<void> {return;};
    getDepth(){return 0;};
    setDepth(depth:number){return;};
    async getType() : Promise<string> {return "";};
    async clone() : Promise<Node> {return null;};
    async getFitness() : Promise<number> {return 0.0;};
    async setFitness(fitness : number) : Promise<void> {return;};
}
