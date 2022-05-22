import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';

@Controller('api-profiles-tech-team-api-controller')
export class ApiProfilesTechTeamApiControllerController {
    //constructor(private readonly apiTicketService:ApiTicketService){}

    //Testing endpoint to test functionality
    @Get()
    testing(){
        return  "Testing Tech Team";
    }


   
}
