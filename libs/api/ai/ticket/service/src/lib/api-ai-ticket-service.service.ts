import { Injectable} from '@nestjs/common';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {GetIssueAIQuery,GetTechTeamSpecialisationQuery,GetAllTicketsQuery, GetAllAIQuery} from './queries/api-ai-ticket-query.query';
import { TechTeam, Ticket } from '@prisma/client';
import { GP } from './ai/gp';
import { Node } from './ai/node';
import { SaveAICommand } from './commands/api-ai-ticket-command.command';
import { AiDto } from '@grid-watch/api/ai/ticket/api/shared/api-ai-ticket-api-dto';
import { Tree } from './ai/tree';
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
                    diff = Math.ceil(diff/(1000*60*60*24));
                    expected.push(diff)
                    saveNode.aiType = "Time"
                }

                const currInput:number[] = [];
                currInput.push(tickets[i].assignedTechTeam);
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

    private async getEstimateAI(ticketDto: TicketDto,type:string){
        let models:AiDto[] = [];
        models = await this.queryBus.execute(new GetAllAIQuery());

        let bRetrain:boolean;
        bRetrain = false;

        const typeModel:AiDto[] =[];

        let estimateDto:AiDto;


        if(models.length ==0){
            bRetrain = true;
        }else{
            for(let i=0;i<models.length;i++){
                if(models[i].aiType == type){
                    typeModel.push(models[i]);
                }
            }

            if(typeModel.length == 0){
                bRetrain = true;
            }else{
                estimateDto = typeModel[typeModel.length-1];
            }
        }

        
        if(bRetrain){
            return 0;
        }

        const tempTree: Tree = new Tree(0,null,null);
        const rootNode : Node = await tempTree.reconstruct(estimateDto.aiData);

        const ticketTypes: string[] = estimateDto.aiTicketTypes;
        const ticketCity: string[] = estimateDto.aiTicketCities;

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
        //if exist use
        //pass correct input to AI model
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
