import { Injectable} from '@nestjs/common';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {GetIssueAIQuery,GetTechTeamSpecialisationQuery} from './queries/api-ai-ticket-query.query';
import {} from './commands/api-ai-ticket-command.command';
import { TechTeam, Ticket } from '@prisma/client';
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
}
