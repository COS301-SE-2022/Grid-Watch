import { Injectable } from "@nestjs/common";

@Injectable()
export class Node {
    feature_index:number;
    threshold:number;
    left:Node;
    right:Node;
    var_red:number;
    value:number;
    constructor(feature_index,threshold,left,right,var_red,value){
        //decision nodes
        this.feature_index = feature_index;
        this.threshold = threshold;
        this.left = left;
        this.right = right;
        this.var_red = var_red;
        
        //leaf node
        this.value = value;
    }
}


