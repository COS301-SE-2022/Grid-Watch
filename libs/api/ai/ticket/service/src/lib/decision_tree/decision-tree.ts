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
    
    private getInput(dataset:number[][]){
        const input:number[][]=[];
        for(let i=0;i<dataset.length;i++){
            const tempInput:number[]=[];
            for(let j=0;j<dataset[i].length-1;j++){{
                tempInput.push(dataset[i][j]);
            }
            input.push(tempInput);
            }
        }
        return input;
    }

    private getExpected(dataset:number[][]){
        const expected:number[]=[];
        for(let i=0;i<dataset.length;i++){
            expected.push(dataset[i][dataset[i].length-1]);
        }
        return expected;
    }

    build_tree(dataset:number[][],curr_depth:number){
        const x = this.getInput(dataset);
        const y = this.getExpected(dataset);
        
        const num_samples = x.length;
        const num_features = x[0].length;
        
        let best_split: BestSplit = new BestSplit();

        if (num_samples>=this.min_samples_split && curr_depth<=this.max_depth){
            
            best_split = this.get_best_split(dataset, num_samples, num_features)
            
            if (best_split.getVarRed()>0){
                const left_subtree:Node = this.build_tree(best_split.getDatasetLeft(), curr_depth+1)
                const right_subtree:Node = this.build_tree(best_split.getDatasetRight(), curr_depth+1)
                
                return new Node(best_split.getFeatureIndex(), best_split.getThreshold(), left_subtree, right_subtree, best_split.getVarRed(),-1);
            }
        }
        
        const leaf_value = this.calculate_leaf_value(y);
        return new Node(0,0,null,null,0,leaf_value);        
    }

}
