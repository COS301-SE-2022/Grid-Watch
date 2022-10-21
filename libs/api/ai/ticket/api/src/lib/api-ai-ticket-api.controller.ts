import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { Body, 
         Controller, 
         //Delete, 
         Get, 
         Param, 
         //Param, 
         Post,} from '@nestjs/common';
import {ApiAiTicketServiceService} from '@grid-watch/api/ai/ticket/service';

@Controller('ticketAI')
export class ApiAiTicketApiController {

    constructor(private readonly apiAiTicketServiceService:ApiAiTicketServiceService){}

    //Testing endpoint to test functionality
    @Get()
    testing(){
        return  "Testing Ai Tickets";
    }

    @Get('/train/GP/:popsize&:depth&:generations&:bcost')
    async trainGP(@Param() params){
        return this.apiAiTicketServiceService.trainGP(params.popsize,params.depth,params.generations,params.bcost);
    }

    @Get('/format/:attribute')
    async formatInput(@Param() params){
        return this.apiAiTicketServiceService.formatInput(params.attribute);
    }

    //get endpiont to return the most relevant 
    @Post('/relevant')
    async getRelevantTechTeam(@Body() ticket:TicketDto){
        return this.apiAiTicketServiceService.getRelevantTechTeam(ticket);
    }

    //put endpoint to return estimated cost of this ticket
    @Post('estimate/cost')
    async getEstimateCost(@Body() ticket: TicketDto){
        return this.apiAiTicketServiceService.getEstimateCost(ticket);
    }

    //put endpoint to return estimated time to complete a ticket
    @Post('estimate/time')
    async getEstimateTime(@Body() ticket: TicketDto){
        return this.apiAiTicketServiceService.getEstimateTime(ticket);
    }

    @Post('estimate/priority')
    async getEstimatePriority(@Body() ticket: TicketDto){
        return this.apiAiTicketServiceService.getPriority(ticket);
    }

    @Post('estimate/AI')
    async getEstimate(@Body() arr){
        return this.apiAiTicketServiceService.getEstimateAI(arr.ticket,arr.parameters);
    }

    @Post('test/:min&:depth')
    async test(@Param() par, @Body() arr){
        return this.apiAiTicketServiceService.trainDecision(par.min,par.depth,arr.parameterArray)
    }

}
