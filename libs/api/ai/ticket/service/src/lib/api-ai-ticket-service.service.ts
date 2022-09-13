import { Injectable} from '@nestjs/common';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {GetIssueAIQuery,GetTechTeamSpecialisationQuery,GetAllTicketsQuery} from './queries/api-ai-ticket-query.query';
import { TechTeam, Ticket } from '@prisma/client';
import { GP } from './ai/gp';
import { Node } from './ai/node';
@Injectable()
export class ApiAiTicketServiceService {
    constructor (private commandBus : CommandBus,
                 private queryBus : QueryBus){}

    async getRelevantTechTeam(ticketDto: TicketDto){
        let techTeams: TechTeam[]=[];
        techTeams  = await this.queryBus.execute(new GetTechTeamSpecialisationQuery(ticketDto.ticketType));
        return techTeams;
    }

    async getEstimateCost(ticketDto: TicketDto){
        let tickets:Ticket[] = [];
        tickets =  await this.queryBus.execute(new GetIssueAIQuery(ticketDto.ticketType));
        let cost = 0.0;
        let total = 0;
        
        //TODO: Calculate estimate cost if not in database
        //TODO: Save estimate cost in database
        //TODO: Recalculate esitmate cost(daily) to imporve efficiency

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

    searchArray(element : string, arr){
        for(let s=0;s<arr.length;s++){
            if(element == arr[s]){
                return s;
            }
        }
    }

    async trainGP(popsize: number, depth: number, generations:number){
        const arrTicketType = await this.formatInput("ticketType");
        const arrTicketCity = await this.formatInput("ticketCity");

        let tickets:Ticket[] = [];
        tickets = await this.queryBus.execute(new GetAllTicketsQuery());

        const expected: number[] = [];
        const input: number[][] = [];

        for(let i=0;i<tickets.length;i++){
            if(tickets[i].ticketCloseDate != null){
                expected.push(tickets[i].ticketCost);

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

        return (await this.saveGP(bestNode));
        //save ai model
    }

    async saveGP(node : Node){
        const tree = [];
        tree.push({
            type: await node.getType(),
            depth: await node.getDepth(),
            fitness: await node.getFitness(),
            left: await this.saveTree(await node.left()),
            right: await this.saveTree(await node.right()),
        });
        
        

    }

    async saveTree(node: Node){
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
        const newgroups:string[]|number[]|Date[] = [];
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
                            newgroups[ncount] = tickettemp[attr as keyof typeof tickettemp];
                            ncount++; 
                        }
                    }
                }
            }else{
                for(const attr in tickets[i]){
                    if(attr == attribute){
                        const tickettemp: Ticket = tickets[i];
                        newgroups[0] = tickettemp[attr as keyof typeof tickettemp];
                    }
                }
            }
        }
        return newgroups;
    }

    async getEstimateTime(ticketDto: TicketDto){
        let tickets:Ticket[] = [];
        tickets =  await this.queryBus.execute(new GetIssueAIQuery(ticketDto.ticketType));
        
        //TODO: Calculate estimate Time if not in database
        //TODO: Add to database 
        //TODO: Recalculate estimate Time at time intervals to improve efficiency 
        
        let count =0;
        let days = 0;
        for(let i=0;i<tickets.length;i++){
            if(tickets[i].ticketCreateDate !=null){
                if(tickets[i].ticketCloseDate != null){
                    const createDate: number = tickets[i].ticketCreateDate.getTime();
                    const closeDate: number= tickets[i].ticketCloseDate.getTime();
                    let diff = Math.abs(closeDate-createDate);
                    diff = Math.ceil(diff/(1000*60*60*24));
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
