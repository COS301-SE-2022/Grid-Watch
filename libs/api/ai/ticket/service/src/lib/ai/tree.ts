import { Node } from "./node";
import { LeafNode } from "./leaf-node";
import { PlusNode } from "./plus-node";
import { MinNode } from "./min-node";
import { DivNode } from "./div-node";
import { multNode } from "./mult-node";
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {GetIssueAIQuery,GetTechTeamSpecialisationQuery,GetAllTicketsQuery} from '../queries/api-ai-ticket-query.query';
import { TechTeam, Ticket } from '@prisma/client';
export class Tree {
    depth: Number;
    constructor(depth : Number){

        this.depth = depth;
    }

    async generateRandTree(): Promise<Node>{
        let root : Node = await this.getRandTerminal();
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

        let p1 : Node = await this.getRandLevelNode(levels,root1);
        let p2 : Node = await this.getRandLevelNode(levels,root2);

        const temp1 : Node = await p1.clone();
        const temp2 : Node = await p2.clone();

        //replace node
        this.replaceNode(p1,temp2,root1);
        this.replaceNode(p2,temp1,root2);


        let ret : Node[] = [];
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

        let levelNodes : Node[] = [];
        while(levelNodes.length==0) {
            if(levels-1 <=0){
                randlevel =1;
            }else{
                randlevel = this.randomInt(1, levels-1);
            }
            let pTree : Node[] = [];
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
        let subroot : Node = await this.getRandTerminal();
        this.generateRandSubtree(subroot,mutationdepth);
        //get random leaf node

        let mutate : Node = await root.clone();

        const levels : number  = await this.getLevels(mutate);
        let leaf : Node = await this.getRandLeafLevelNode(mutate);

        //mutate
        this.replaceNode(leaf,subroot,mutate);

        return mutate;
    }

    async getRandLeafLevelNode(parent : Node) : Promise<Node>{
        let pTree : Node[] = [];
        this.getArr(parent,pTree);
        let levelNodes : Node[] = [];
        for(let i=0;i<pTree.length;i++){
            if(await pTree[i].getType() == "leaf"){
                levelNodes.push(pTree[i]);
            }
        }

        let randNode : number = this.randomInt(0, levelNodes.length);
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
        let depth: Node[] = [];
        this.getArr(root,depth);
        let maxdepth = 0;
        for(let i=0;i<depth.length;i++){
            if(maxdepth<await depth[i].getDepth()){
                maxdepth=await depth[i].getDepth();
            }
        }
        return maxdepth;
    }

    async getInput() : Promise<number[]>{
        let tickets:Ticket[] = [];
        tickets =  await this.queryBus.execute(new GetIssueAIQuery(ticketDto.ticketType));
        return null;
    }
    async getFitness(curr : Node): Promise<number>{
        let correct=0;
        let all=0;
        let arrTest : Node[] =[];
        this.getArr(curr,arrTest);
        try {
            //let dynamic input of array
            //set dynamic input of array
            //get expected value
            //compare 
            
            while (Reader.hasNextLine()) {
                String data = Reader.nextLine();
                String test = data;
                int[] input = new int[count];

                for(int i=0;i<count;i++){
                    String val = test.substring(0,test.indexOf(","));
                    input[i] = Integer.parseInt(val);
                    test=test.substring(test.indexOf(",")+1);
                }
                int expected = Integer.parseInt(test);

                double res=0.0;

                int cinput=0;
                for(int i=0;i<arrTest.getSize();i++){
                    if(arrTest.get(i).getType().equals("leaf")){

                        //arrTest.get(i).setVal(input[rand.nextInt(count)]);
                        arrTest.get(i).setVal(input[cinput%(count)]);
                        cinput++;
                    }
                }

                res = curr.execute();
                int compare =0;
                if(res>0.5){
                    compare=1;
                }

                if(compare==expected){
                    correct++;
                }
                all++;

            }
            Reader.close();
            return (double)correct/(double)all*100;

        } catch (FileNotFoundException e) {
            System.out.println("An error occurred. Textfile does not exist.\n");
        }
        return-1;
    }

}

