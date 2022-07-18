import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';

  import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
  import {ApiProfilesTechTeamServiceService} from '@grid-watch/api/profiles/tech-team/service'
  
@Controller('techteam')
export class ApiProfilesTechTeamApiControllerController {
    constructor(private readonly apiTechTeamService:ApiProfilesTechTeamServiceService){}

    //Testing endpoint to test functionality
    @Get()
    testing(){
        return  "Testing Tech Team";
    }

    //post endpoint to verify password
    @Post('/verify')
    async verifyPassword(@Param() params ){
        return this.apiTechTeamService.verifyPassword(params["email"],params["password"]);
    }

    //get endpiont to return all Tech Teams
    @Get('/all')
    async getTechTeams(){
        return this.apiTechTeamService.getTechTeams();
    }

    //get endpiont to return a specific admin
    @Get(':id')
    async getTechTeamId(@Param() params){
        return this.apiTechTeamService.getTechTeamId(parseInt(params.id));
    }

    //get endpiont to return a TechTeam with specific name
    @Get('/name/:name')
    async getTechTeamName(@Param() params){
        return this.apiTechTeamService.getTechTeamName(params.name);
    }

    //get endpiont to return a TechTeam with partial name
    @Get('/name/partial/:name')
    async searchTechTeamName(@Param() params){
        return this.apiTechTeamService.searchTechTeamName(params.name);
    }
    
    //get endpiont to return a TechTeam with specific email
    @Get('/email/:email')
    async getTechTeamEmail(@Param() params){
        return this.apiTechTeamService.getTechTeamEmail(params.email);
    }
    
    //get endpiont to return a TechTeam with specific specialisation
    @Get('/specialisation/:specialisation')
    async getTechTeamSpecialisation(@Param() params){
        return this.apiTechTeamService.getTechTeamSpecialisation(params.specialisation);
    }

    //get endpiont to return a TechTeam with specific contact number
    @Get('/contactnr/contactNr')
    async getTechTeamContactNr(@Param() params){
        return this.apiTechTeamService.getTechTeamContactNr(params.contactNr);
    }

    //get endpiont to return all assigned tickets
    @Get('/assigned/:techTeamId')
    async getAllAssignedTickets(@Param() params){
        return this.apiTechTeamService.getAllAssignedTickets(params.techTeamId);
    }
    
    //assign Ticket endpoint 
    @Put('/assign/:ticketId')
    async assignTicket(@Param() params,@Body() techTeamId){
        return this.apiTechTeamService.assignTicket(parseInt(params.ticketId),parseInt(techTeamId['techTeamId']));
    }

    //create Tech Team endpoint
    @Post('/create')
    async createTechTeam(@Body() techTeam: TechTeamDto){
        return this.apiTechTeamService.createTechTeam(techTeam);
    }

    //update Teach Team endpoint 
    @Put('/update/:id')
    async updateTechTeam(@Param() params,@Body() techTeam: TechTeamDto):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeam(parseInt(params.id),techTeam);
    }

    //update Tech Team Name endpoint
    @Put('/update/name/:id')
    async updateTechTeamName(@Param() params,@Body() name: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamName(parseInt(params.id),name["name"]);
    }

    //update Tech Team email endpoint
    @Put('/update/email/:id')
    async updateTechTeamEmail(@Param() params,@Body() email: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamEmail(parseInt(params.id),email["email"]);
    }

    //update Tech Team specialisation endpoint
    @Put('/update/specialisation/:id')
    async updateTechTeamSpecialisation(@Param() params,@Body() specialisation: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamSpecialisation(parseInt(params.id),specialisation["specialisation"]);
    }

    //update Tech Team contact number endpoint
    @Put('/update/contactnr/:id')
    async updateTechTeamContactNr(@Param() params,@Body() contactNr: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamContactNr(parseInt(params.id),contactNr["ContactNr"]);
    }

    //update Tech Team number jobs completed endpoint
    @Put('/update/nrjobscompleted/:id')
    async updateTechTeamNrJobsCompleted(@Param() params,@Body() nrJobsCompleted: number):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamNrJobsCompleted(parseInt(params.id),nrJobsCompleted["nrJobsCompleted"]);
    }

    //Increment Tech Team number jobs completed endpoint
    @Put('/update/incjobscompleted/:id')

    async incTechTeamNrJobsCompleted(@Param() params):Promise<boolean> {
        return this.apiTechTeamService.incTechTeamNrJobsCompleted(parseInt(params.id));
    }

    //update Tech Team rating endpoint
    @Put('/update/ratingjobs/:id')
    async updateTechTeamRatingJobs(@Param() params,@Body() ratingJobs: number):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamRatingJobs(parseInt(params.id),ratingJobs["ratingJobs"]);
    }

    //Delete specified techTeam
    @Delete('/delete')
    async deleteTicket(@Body() techTeamId: number):Promise<boolean> {
        return this.apiTechTeamService.deleteTechTeam(techTeamId["techTeamId"]);
    
    }
}
