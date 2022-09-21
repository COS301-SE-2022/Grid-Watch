export class BestSplit {

    dataset_left:number[][];
    dataset_right:number[][];
    feature_index: number;
    threshold: number;
    var_red:number;

    setDatasetLeft(dataset_left:number[][]){
        this.dataset_left=dataset_left;
    }

    setDatasetRight(dataset_rigth:number[][]){
        this.dataset_right = dataset_rigth;
    }

    setFeatureIndex(feature_index:number){
        this.feature_index= feature_index;
    }

    setThreshold(threshold:number){
        this.threshold = threshold;
    }

    setVarRed(var_red:number){
        this.var_red = var_red;
    }

    getDatasetLeft(){
        return this.dataset_left;
    }

    getDatasetRight(){
        return this.dataset_right;
    }

    getFeatureIndex(){
        return this.feature_index;
    }

    getThreshold(){
        return this.threshold;
    }

    getVarRed(){
        return this.var_red;
    }


}
