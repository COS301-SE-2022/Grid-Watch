import { BestSplit } from "./best-split";
import { Node } from "./node";

export class DecisionTree {
    root:Node;
    min_samples_split:number;
    max_depth:number;
    constructor(min_samples_split:number,max_depth:number){
        this.root = null;

        this.min_samples_split = min_samples_split;
        this.max_depth = max_depth;
    }
    
}
