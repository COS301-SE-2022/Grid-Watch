import { Node } from "./node";
import { LeafNode } from "./leaf-node";
import { PlusNode } from "./plus-node";
import { MinNode } from "./min-node";
import { DivNode } from "./div-node";
import { multNode } from "./mult-node";

export class Tree {
    depth: number;
    input : number[][];
    expected : number[];
    constructor(depth : number, input : number[][], expected: number[]){
        this.expected = expected;
        this.input = input;
        this.depth = depth;
    }

    async generateRandTree(): Promise<Node>{
        const root : Node = await this.getRandTerminal();
        root.setDepth(0);
        await this.generateRandNode(root);
        return root;
    }

    async generateRandNode(curr : Node) : Promise<Node>{
        if(await curr.getType() == "leaf"){
            return;
        }
        if(await curr.getDepth()==this.depth-1) {
            curr.setLeft(new LeafNode(0));
            curr.setRight(new LeafNode(0));
            (await curr.left()).setDepth(await curr.getDepth()+1);
            (await curr.right()).setDepth(await curr.getDepth()+1);
            return;
        }else {
           curr.setLeft(await this.getRandNode(await curr.getDepth()));
           curr.setRight(await this.getRandNode(await curr.getDepth()));
           this.generateRandNode(await curr.left());
           this.generateRandNode(await curr.right());

        }
    }

    async populateTree(curr : Node): Promise<void>{
        if(await curr.getType()=="leaf"){
            curr.setVal(this.randomInt(0,20));
            return;
        }else{
            this.populateTree(await curr.left());
            this.populateTree(await curr.right());
        }

    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    
    async getRandNode(depth : number): Promise<Node>{
        const options : number = this.randomInt(0,2);
        let out : Node = null;
        if (options == 0) {
            out = await this.getRandTerminal();
        } else {
            out= new LeafNode(0);
        }


        out.setDepth(depth+1);
        return out;
    }

    async getRandTerminal(): Promise<Node>{
        const decider : number = this.randomInt(0,4);
        let out : Node = null;
        if(decider==0){//+
            out = new PlusNode(null,null);
        }else if(decider==1){//-
            out = new MinNode(null,null);
        }else if(decider==2){//*
            out = new multNode(null,null);
        }else{// /
            out = new DivNode(null,null);
        }
        return out;
    }

    async getArr(curr : Node,acurr : Node[]) : Promise<void>{
        if(await curr.getType() == "leaf"){
            acurr.push(curr);
        }else{
            this.getArr(await curr.left(),acurr);
            acurr.push(curr);
            this.getArr(await curr.right(),acurr);
        }
    }

    async crossOver(parent1 : Node,parent2 : Node): Promise<Node[]>{
        //select random level
        const levels : number = Math.min(await this.getLevels(parent1),await this.getLevels(parent2));//between level 1 and the last level-1
        
        const root1 : Node = await parent1.clone();
        const root2 : Node = await parent2.clone();

        const p1 : Node = await this.getRandLevelNode(levels,root1);
        const p2 : Node = await this.getRandLevelNode(levels,root2);

        const temp1 : Node = await p1.clone();
        const temp2 : Node = await p2.clone();

        //replace node
        this.replaceNode(p1,temp2,root1);
        this.replaceNode(p2,temp1,root2);


        const ret : Node[] = [];
        ret.push(root1);
        ret.push(root2);

        return ret;
    }

    async replaceNode(replace : Node, replaceBy: Node,curr : Node) : Promise<void>{
        if(await curr.left()==replace){
            curr.setLeft(replaceBy);
        }else if(await curr.right()==replace){
            curr.setRight(replaceBy);
        }else{
            if(!(await curr.getType() == "leaf")){
                this.replaceNode(replace,replaceBy,await curr.left());
                this.replaceNode(replace,replaceBy,await curr.right());
            }

        }
    }

    async getRandLevelNode(levels : number,parent : Node) : Promise<Node>{
        let randlevel = 0;

        const levelNodes : Node[] = [];
        while(levelNodes.length==0) {
            if(levels-1 <=0){
                randlevel =1;
            }else{
                randlevel = this.randomInt(1, levels-1);
            }
            const pTree : Node[] = [];
            this.getArr(parent, pTree);

            for (let  i = 0; i < pTree.length; i++) {
                if (await pTree[i].getDepth() == randlevel) {
                    levelNodes.push(pTree[i]);
                }
            }
        }

        const randNode : number = this.randomInt(0,levelNodes.length);
        return levelNodes[randNode];
    }


    async mutation(root : Node,mutationdepth : number) : Promise<Node>{
        //generate random subtree
        const subroot : Node = await this.getRandTerminal();
        this.generateRandSubtree(subroot,mutationdepth);
        //get random leaf node

        const mutate : Node = await root.clone();

        const levels : number  = await this.getLevels(mutate);
        const leaf : Node = await this.getRandLeafLevelNode(mutate);

        //mutate
        this.replaceNode(leaf,subroot,mutate);

        return mutate;
    }

    async getRandLeafLevelNode(parent : Node) : Promise<Node>{
        const pTree : Node[] = [];
        this.getArr(parent,pTree);
        const levelNodes : Node[] = [];
        for(let i=0;i<pTree.length;i++){
            if(await pTree[i].getType() == "leaf"){
                levelNodes.push(pTree[i]);
            }
        }

        const randNode : number = this.randomInt(0, levelNodes.length);
        return levelNodes[randNode];
    }

    async generateRandSubtree(curr : Node,subdepth : number) : Promise<void>{
        if (await curr.getType()== "leaf") {
            //return ;
        }
        if (await curr.getDepth() == subdepth - 1) {
            curr.setLeft(new LeafNode(0));
            curr.setRight(new LeafNode(0));
            (await curr.left()).setDepth(await curr.getDepth() + 1);
            (await curr.right()).setDepth(await curr.getDepth() + 1);
            //return null;
        } else {
            curr.setLeft(await this.getRandTerminal());
            curr.setRight(await this.getRandTerminal());
            this.generateRandNode(await curr.left());
            this.generateRandNode(await curr.right());

        }
    }

    async getLevels(root : Node) : Promise<number>{
        const depth: Node[] = [];
        this.getArr(root,depth);
        let maxdepth = 0;
        for(let i=0;i<depth.length;i++){
            if(maxdepth<await depth[i].getDepth()){
                maxdepth=await depth[i].getDepth();
            }
        }
        return maxdepth;
    }

    async getFitness(curr : Node): Promise<number>{
        let correct=0;
        let all=0;
        const arrTest : Node[] =[];
        this.getArr(curr,arrTest);
            
            for(let a=0;a<this.input.length;a++){

                let cinput: number;
                for(let i=0;i<arrTest.length;i++){
                    if(await arrTest[i].getType() == "leaf"){
                        arrTest[i].setVal(this.input[a][cinput%(this.input.length)]);
                        cinput++;
                    }
                }

                const res = await curr.execute();
                let compare: number;
                if(res>0.5){
                    compare=1;
                }

                if(compare==this.expected[a]){
                    correct++;
                }
                all++;

            }
            return correct/all*100;
        return-1;
    }

}

