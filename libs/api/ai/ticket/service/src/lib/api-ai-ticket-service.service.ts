import { Injectable} from '@nestjs/common';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {GetIssueQuery} from './queries/api-ai-ticket-query.query';
import {} from './commands/api-ai-ticket-command.command';
@Injectable()
export class ApiAiTicketServiceService {
    constructor (private readonly commanndBus : CommandBus,
                 private readonly queryBus : QueryBus){}

    async getRelevantTechTeam(ticketDto: TicketDto){
        return "Working Progress";
    }

    async getEstimateCost(ticketDto: TicketDto){
        let tickets:TicketDto[] = [];
        tickets = await this.queryBus.execute(new GetIssueQuery(ticketDto.ticketType));
        
        let cost = 0.0;
        for(let i=0;i<tickets.length;i++){
            cost+=tickets[i].ticketCost;
        }
        if(tickets.length==0){
            cost = 0.0;
        }else{
            cost = cost / tickets.length;
        }

        return cost;
    }

    async getEstimateTime(ticketDto: TicketDto){
    

        return "Whelp";
    }
}
