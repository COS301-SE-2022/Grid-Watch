import { Injectable} from '@nestjs/common';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {GetIssueAIQuery,GetTechTeamSpecialisationQuery,GetAllTicketsQuery, GetAllAIQuery} from './queries/api-ai-ticket-query.query';
import { TechTeam, Ticket } from '@prisma/client';
import { GP } from './ai/gp';
import { Node } from './ai/node';
import { Node as NodeDT} from './decision_tree/node' ;
import { SaveAICommand } from './commands/api-ai-ticket-command.command';
import { AiDto } from '@grid-watch/api/ai/ticket/api/shared/api-ai-ticket-api-dto';
import { Tree } from './ai/tree';
import { DecisionTree } from './decision_tree/decision-tree';
import { createInflate } from 'zlib';
@Injectable()
export class ApiAiTicketServiceService {
    constructor (private commandBus : CommandBus,
                 private queryBus : QueryBus){}

    async getRelevantTechTeam(ticketDto: TicketDto){
        let techTeams: TechTeam[]=[];
        techTeams  = await this.queryBus.execute(new GetTechTeamSpecialisationQuery(ticketDto.ticketType));
        return techTeams;
    }



    private searchArray(element : string, arr){
        for(let s=0;s<arr.length;s++){
            if(element == arr[s]){
                return s;
            }
        }
    }

    //////////////////////////////////////////////////////////////////
    //////////               Genetic Programming                //////
    //////////////////////////////////////////////////////////////////

    async trainGP(popsize: number, depth: number, generations:number, bCost : boolean){
        const arrTicketType = await this.formatInput("ticketType");
        const arrTicketCity = await this.formatInput("ticketCity");

        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        const saveNode : AiDto = new AiDto();

        const expected: number[] = [];
        const input: number[][] = [];

        for(let i=0;i<tickets.length;i++){
            if(tickets[i].ticketCloseDate != null){
                if(bCost){
                    expected.push(tickets[i].ticketCost);
                    saveNode.aiType = "Cost"
                }else{
                    const createDate: number = tickets[i].ticketCreateDate.getTime();
                    const closeDate: number= tickets[i].ticketCloseDate.getTime();
                    let diff = Math.abs(closeDate-createDate);
                    diff = Math.ceil(diff/(1000*60*60));
                    expected.push(diff)
                    saveNode.aiType = "Time"
                }

                const currInput:number[] = [];
                if(tickets[i].assignedTechTeam == null){
                    currInput.push(1);
                }else{
                    currInput.push(tickets[i].assignedTechTeam);
                }
                currInput.push(this.searchArray(tickets[i].ticketType,arrTicketType));
                currInput.push(this.searchArray(tickets[i].ticketCity,arrTicketCity))
                currInput.push(tickets[i].ticketUpvotes);

                input.push(currInput);
            }
        }

        const gp: GP = new GP(popsize,depth,generations,input,expected);
        const bestNode: Node = await gp.GPA();

        const aiData =  await this.saveGP(bestNode);
        

        saveNode.aiData = aiData;
        saveNode.aiFitness = await bestNode.getFitness();
        saveNode.aiTicketCities = arrTicketCity;
        saveNode.aiTicketTypes = arrTicketType;

        if(isNaN(saveNode.aiFitness)){
            saveNode.aiFitness = 0;
        }

        if(saveNode.aiType == undefined){
            saveNode.aiType = "ND";
        }
        
        await this.commandBus.execute(new SaveAICommand(saveNode));
        return saveNode;
    }

    private async saveGP(node : Node){
        const tree = [];
        tree.push({
            type: await node.getType(),
            depth: await node.getDepth(),
            fitness: await node.getFitness(),
            left: await this.saveTree(await node.left()),
            right: await this.saveTree(await node.right()),
        });
        
        return tree;
    }

    private async saveTree(node: Node){
        if(node ==null){
            return null;
        }else{
            const tree = [];
            tree.push({
                type: await node.getType(),
                depth: await node.getDepth(),
                left: await this.saveTree(await node.left()),
                right: await this.saveTree(await node.right())
            });
            return tree;
        }
    }

    /////////////////////////////////////////////////////////////////////
    ////////////            Decision Tree                ////////////////
    /////////////////////////////////////////////////////////////////////
    private async saveDecision(node:NodeDT){
        if(node==null){
            return null;
        }else{
            const tree = [];
            tree.push({
                feature_index: node.feature_index,
                threshold: node.threshold,
                left: await this.saveDecision(node.left),
                right:await this.saveDecision(node.right),
                var_red: node.var_red,
                value: node.value
            });

            return tree;
        }
    }

    async trainDecision(minSplit: number, depth: number,bCost : boolean){
        const arrTicketType = await this.formatInput("ticketType");
        const arrTicketCity = await this.formatInput("ticketCity");

        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        const saveNode : AiDto = new AiDto();

        const input: number[][] = [];

        for(let i=0;i<tickets.length;i++){
            if(tickets[i].ticketCloseDate != null){
                

                const currInput:number[] = [];
                if(tickets[i].assignedTechTeam == null){
                    currInput.push(1);
                }else{
                    currInput.push(tickets[i].assignedTechTeam);
                }
                currInput.push(this.searchArray(tickets[i].ticketType,arrTicketType));
                currInput.push(this.searchArray(tickets[i].ticketCity,arrTicketCity));
                currInput.push(tickets[i].ticketUpvotes);

                if(bCost){
                    currInput.push(tickets[i].ticketCost);
                    saveNode.aiType = "CostDecision";
                }else{
                    const createDate: number = tickets[i].ticketCreateDate.getTime();
                    const closeDate: number= tickets[i].ticketCloseDate.getTime();
                    let diff = Math.abs(closeDate-createDate);
                    diff = Math.ceil(diff/(1000*60*60));
                    currInput.push(diff);
                    saveNode.aiType = "TimeDecision";
                }
                input.push(currInput);
            }
        }

        if(input.length==0){
            return null;
        }
        const decisionTree: DecisionTree = new DecisionTree(minSplit,depth);
        decisionTree.fit(input);
        const bestNode: NodeDT = decisionTree.root;

        const aiData =  await this.saveDecision(bestNode);
        

        saveNode.aiData = aiData;
        saveNode.aiFitness = 0;
        saveNode.aiTicketCities = arrTicketCity;
        saveNode.aiTicketTypes = arrTicketType;

        if(isNaN(saveNode.aiFitness)){
            saveNode.aiFitness = 0;
        }

        if(saveNode.aiType == undefined){
            saveNode.aiType = "ND";
        }
        
        await this.commandBus.execute(new SaveAICommand(saveNode));
        return saveNode;
    }

    async trainDecisionPriority(minSplit: number, depth: number){
        const arrTicketType = await this.formatInput("ticketType");
        const arrTicketCity = await this.formatInput("ticketCity");

        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        const saveNode : AiDto = new AiDto();

        const input: number[][] = [];

        for(let i=0;i<tickets.length;i++){
            if(tickets[i].ticketCloseDate != null && tickets[i].ticketPriority != null){
                

                const currInput:number[] = [];
                if(tickets[i].assignedTechTeam == null){
                    currInput.push(1);
                }else{
                    currInput.push(tickets[i].assignedTechTeam);
                }
                currInput.push(this.searchArray(tickets[i].ticketType,arrTicketType));
                currInput.push(this.searchArray(tickets[i].ticketCity,arrTicketCity));
                currInput.push(tickets[i].ticketUpvotes);

                if(tickets[i].ticketPriority == "Low"){
                    currInput.push(0);
                }else if(tickets[i].ticketPriority == "Medium"){
                    currInput.push(1);
                }else{
                    currInput.push(2);
                }
                saveNode.aiType = "priorityDecision";
                input.push(currInput);
            }
        }

        if(input.length==0){
            return null;
        }
        const decisionTree: DecisionTree = new DecisionTree(minSplit,depth);
        decisionTree.fit(input);
        const bestNode: NodeDT = decisionTree.root;

        const aiData =  await this.saveDecision(bestNode);
        

        saveNode.aiData = aiData;
        saveNode.aiFitness = 0;
        saveNode.aiTicketCities = arrTicketCity;
        saveNode.aiTicketTypes = arrTicketType;

        if(isNaN(saveNode.aiFitness)){
            saveNode.aiFitness = 0;
        }

        if(saveNode.aiType == undefined){
            saveNode.aiType = "ND";
        }
        
        await this.commandBus.execute(new SaveAICommand(saveNode));
        return saveNode;
    }

    ///////////////////////////////////////////////////////////////
    ///////////          Helper Functions            //////////////
    ///////////////////////////////////////////////////////////////
    async formatInput(attribute : string){
        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        //count # of groups
        const newgroups:string[]= [];
        let ncount = 0;
        for(let i=0;i<tickets.length;i++){
            if(newgroups.length !=0){
                let bexist = false;
                for(let j=0;j<newgroups.length;j++){
                    for(const attr in tickets[i]){
                        if(attr == attribute){
                            const tickettemp:Ticket = tickets[i];
                            if(tickettemp[attr as keyof typeof tickettemp] == newgroups[j]){
                                bexist = true;
                            }
                        }
                    }
                    
                }
                if(!bexist){
                    for(const attr in tickets[i]){
                        if(attr == attribute){
                            const tickettemp: Ticket = tickets[i];
                            newgroups[ncount] = tickettemp[attr as keyof typeof tickettemp].toString();
                            ncount++; 
                        }
                    }
                }
            }else{
                for(const attr in tickets[i]){
                    if(attr == attribute){
                        const tickettemp: Ticket = tickets[i];
                        newgroups[0] = tickettemp[attr as keyof typeof tickettemp].toString();
                    }
                }
            }
        }
        return newgroups;
    }

    private async getAverageCost(ticketDto: TicketDto){
        let tickets:Ticket[] = [];
        tickets =  await this.queryBus.execute(new GetIssueAIQuery(ticketDto.ticketType));
        let cost = 0.0;
        let total = 0;
    
        for(let i=0;i<tickets.length;i++){
            if(tickets[i].ticketCost !=null){
                cost+=tickets[i].ticketCost;
                total+=1;
            }
        }
        if(total == 0){
            cost = 0.0;
        }else{
            cost = cost / total;
        }

        return cost;
    }

    private async getAverageTime(ticketDto: TicketDto){
        let tickets:Ticket[] = [];
        tickets =  await this.queryBus.execute(new GetIssueAIQuery(ticketDto.ticketType));
        
        let count =0;
        let days = 0;
        for(let i=0;i<tickets.length;i++){
            if(tickets[i].ticketCreateDate !=null){
                if(tickets[i].ticketCloseDate != null){
                    const createDate: number = tickets[i].ticketCreateDate.getTime();
                    const closeDate: number= tickets[i].ticketCloseDate.getTime();
                    let diff = Math.abs(closeDate-createDate);
                    diff = Math.ceil(diff/(1000*60*60));
                    count++;
                    days += diff;
                }
            }
        }

        if(count!=0){
            days = days/count;
        }


        return days;
    }

    private async getEstimateAI(ticketDto: TicketDto,type:string){
        let models:AiDto[] = [];
        models = await this.queryBus.execute(new GetAllAIQuery());

        let bRetrain:boolean;
        bRetrain = false;

        const typeModel:AiDto[] =[];

        let estimateDto:AiDto;

        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        if(models.length ==0){
            bRetrain = true;
        }else{
            for(let i=0;i<models.length;i++){
                if(models[i].aiType == type){
                    typeModel.push(models[i]);
                }
            }

            if(typeModel.length == 0 || tickets.length % 1000 == 0){
                bRetrain = true;
            }else{
                estimateDto = typeModel[typeModel.length-1];
            }
        }

        if(type == "CostDecision"||type=="TimeDecision"){
            if(bRetrain){
                if(type == "TimeDecision"){
                    this.trainDecision(3,5,false);
                    return await this.getAverageTime(ticketDto);
                }else{
                    this.trainDecision(3,5,true);
                    return await this.getAverageCost(ticketDto);
                }
            }

            const decisionTree = new DecisionTree(3,5);
            
            const rootNode:NodeDT = decisionTree.reconstruct(estimateDto.aiData);
            const ticketTypes: string[] = estimateDto["ticketTypes"];
            const ticketCity: string[] = estimateDto["ticketCities"];

            const inputVals:number[] = [];

            inputVals.push(ticketDto.assignedTechTeam);
            inputVals.push(ticketDto.ticketUpvotes);
            
            for(let i=0;i<ticketTypes.length;i++){
                if(ticketTypes[i]==ticketDto.ticketType){
                    inputVals.push(i);
                }
            }
            
            for(let i=0;i<ticketCity.length;i++){
                if(ticketTypes[i]==ticketDto.ticketCity){
                    inputVals.push(i);
                }
            }

            const estimate = decisionTree.make_prediction(inputVals,rootNode);
            return estimate;


        }else{
            if(bRetrain){
                if(type == "Time"){
                    this.trainGP(200,7,10,false);
                    return await this.getAverageTime(ticketDto);
                }else{
                    this.trainGP(200,7,10,true);
                    return await this.getAverageCost(ticketDto);
                }
            }

            const tempTree: Tree = new Tree(0,null,null);
            const rootNode : Node = await tempTree.reconstruct(estimateDto.aiData);

            const ticketTypes: string[] = estimateDto["ticketTypes"];
            const ticketCity: string[] = estimateDto["ticketCities"];

            const inputVals:number[] = [];

            inputVals.push(ticketDto.assignedTechTeam);
            inputVals.push(ticketDto.ticketUpvotes);
            
            for(let i=0;i<ticketTypes.length;i++){
                if(ticketTypes[i]==ticketDto.ticketType){
                    inputVals.push(i);
                }
            }

            for(let i=0;i<ticketCity.length;i++){
                if(ticketTypes[i]==ticketDto.ticketCity){
                    inputVals.push(i);
                }
            }

            const estimate = await tempTree.getPrediction(rootNode,inputVals);

            return estimate;
        }
    }

    private async getEstimatePriorityAi(ticketDto: TicketDto,type:string){
        let models:AiDto[] = [];
        models = await this.queryBus.execute(new GetAllAIQuery());

        let bRetrain:boolean;
        bRetrain = false;

        const typeModel:AiDto[] =[];

        let estimateDto:AiDto;

        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        if(models.length ==0){
            bRetrain = true;
        }else{
            for(let i=0;i<models.length;i++){
                if(models[i].aiType == type){
                    typeModel.push(models[i]);
                }
            }

            if(typeModel.length == 0 || tickets.length % 1000 == 0){
                bRetrain = true;
            }else{
                estimateDto = typeModel[typeModel.length-1];
            }
        }

        if(bRetrain){
            
            return await this.trainDecisionPriority(3,5);
        }
        const decisionTree = new DecisionTree(3,5);
        
        const rootNode:NodeDT = decisionTree.reconstruct(estimateDto.aiData);
        
        const ticketTypes: string[] = estimateDto["ticketTypes"];
        const ticketCity: string[] = estimateDto["ticketCities"];
        
        const inputVals:number[] = [];
        inputVals.push(ticketDto.assignedTechTeam);
        inputVals.push(ticketDto.ticketUpvotes);
        
        for(let i=0;i<ticketTypes.length;i++){
            if(ticketTypes[i]==ticketDto.ticketType){
                inputVals.push(i);
            }
        }
        
        for(let i=0;i<ticketCity.length;i++){
            if(ticketTypes[i]==ticketDto.ticketCity){
                inputVals.push(i);
            }
        }

        const prediction = Math.floor(decisionTree.make_prediction(inputVals,rootNode));
        if(prediction==0){
            return "Low"
        }else if(prediction ==1){
            return "Meduim"
        }else{
            return "High"
        }
    }

    
    ////////////////////////////////////////////////////////////////////
    ///////////////        Endpoint Functions        ///////////////////
    ////////////////////////////////////////////////////////////////////

    async getEstimateCost(ticketDto: TicketDto){
        try {
            const estimate  =  await this.getEstimateAI(ticketDto,"CostDecision");
            let baverage = false;
            if(estimate == Infinity || estimate < 0 || estimate == -Infinity){
                baverage = true;
            }

            if(baverage){
                return await this.getAverageCost(ticketDto);
            }

            return estimate;
        } catch (error) {
            return await this.getAverageCost(ticketDto);
        }
    }

    

    async getEstimateTime(ticketDto: TicketDto){
        try {
            const estimate  =  await this.getEstimateAI(ticketDto,"TimeDecision");
            let baverage = false;
            if(estimate == Infinity || estimate < 0 || estimate == -Infinity){
                baverage = true;
            }

            if(baverage){
                return await this.getAverageTime(ticketDto);
            }

            return estimate;
        } catch (error) {
            return await this.getAverageTime(ticketDto);
        }
        
    }

    async getPriority(ticketDto: TicketDto){
        try {
            const estimate  =  await this.getEstimatePriorityAi(ticketDto,"PriorityDecision");
            if(estimate == null){
                return "None";
            }
            return estimate;
        } catch (error) {
            return "None";
        }
        
    }

    // average cost and time to repair grouped by areas to identify problematic areas or severity
    async getAverageCostByArea(){
        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        //count # of groups
        const newgroups:string[] = [];
        let ncount = 0;
        for(let i=0;i<tickets.length;i++){
            if(newgroups.length !=0){
                let bexist = false;
                for(let j=0;j<newgroups.length;j++){
                    if(tickets[i].ticketCity == newgroups[j]){
                        bexist = true;
                    }
                }
                if(!bexist){
                    newgroups[ncount] = tickets[i].ticketCity;
                    ncount++; 
                }
            }else{
                newgroups[0] = tickets[i].ticketCity;
            }
        }

        //calculate # of ticket types
        const ticketTypes:string[] = [];
        let tcount = 0;
        for(let i=0;i<tickets.length;i++){
            if(ticketTypes.length !=0){
                let bexist = false;
                for(let j=0;j<ticketTypes.length;j++){
                    if(tickets[i].ticketType == ticketTypes[j]){
                        bexist = true;
                    }
                }
                if(!bexist){
                    ticketTypes[tcount] = tickets[i].ticketType;
                    tcount++; 
                }
            }else{
                ticketTypes[0] = tickets[i].ticketType;
            }
        }
        
        //calculate average cost per type for each city
        const groups = [];
        let gcount=0;
        for(let i=0;i<newgroups.length;i++){
            for(let j=0;j<ticketTypes.length;j++){
                let cost = 0.0;
                let counts = 0;
                for(let c=0;c<tickets.length;c++){
                    if(tickets[c].ticketType == ticketTypes[j] && tickets[c].ticketCity==newgroups[i]){
                        cost +=tickets[c].ticketCost;
                        counts++;
                    }
                }
                cost = cost/counts;
                groups[gcount] = {'city':newgroups[i],
                                  'type':ticketTypes[j],
                                  'cost':cost}
                gcount++;
            }
        }
        return groups;
    }
}
