import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { ApiProfilesTechTeamApiDto } from '../dto/api-profiles-tech-team-api.dto';
@Controller('techteam')
export class ApiProfilesTechTeamApiControllerController {
    //constructor(private readonly apiTechTeamService:ApiTechTeamService){}

    //Testing endpoint to test functionality
    @Get()
    testing(){
        return  "Testing Tech Team";
    }

    //create Tech Team endpoint
    @Post('/create')
    async CreateTechTeam(@Body() techTeam: ApiProfilesTechTeamApiDto){
        //return this.apiTechTeamService.createTechTeam(techTeam);
    }

    //update Teach Team endpoint 
    @Put('/update/:id')
    async UpdateTechTeam(@Param() params,@Body() techTeam: ApiProfilesTechTeamApiDto):Promise<boolean> {
        //return this.apiTechTeamService.updateTechTeam(parseInt(params.id),techTeam);
        return true;
    }

    //update Tech Team Name endpoint
    @Put('/update/name/:id')
    async UpdateTechTeamName(@Param() params,@Body() name: string):Promise<boolean> {
        //return this.apiTechTeamService.updateTechTeamName(parseInt(params.id),name["name"]);
        return true;
    }

    //update Tech Team email endpoint
    @Put('/update/email/:id')
    async UpdateTechTeamEmail(@Param() params,@Body() email: string):Promise<boolean> {
        //return this.apiTechTeamService.updateTechTeamEmail(parseInt(params.id),email["email"]);
        return true;
    }

    //update Tech Team specialisation endpoint
    @Put('/update/specialisation/:id')
    async UpdateTechTeamSpecialisation(@Param() params,@Body() specialisation: string):Promise<boolean> {
        //return this.apiTechTeamService.updateTechTeamSpecialisation(parseInt(params.id),specialisation["specialisation"]);
        return true;
    }

    //update Tech Team contact number endpoint
    @Put('/update/contactnr/:id')
    async UpdateTechTeamContactNr(@Param() params,@Body() ContactNr: string):Promise<boolean> {
        //return this.apiTechTeamService.updateTechTeamContactNr(parseInt(params.id),ContactNr["ContactNr"]);
        return true;
    }

    //update Tech Team number jobs completed endpoint
    @Put('/update/nrjobscompleted/:id')
    async UpdateTechTeamNrJobsCompleted(@Param() params,@Body() nrJobsCompleted: number):Promise<boolean> {
        //return this.apiTechTeamService.updateTechTeamNrJobsCompleted(parseInt(params.id),nrJobsCompleted["nrJobsCompleted"]);
        return true;
    }

    //Increment Tech Team number jobs completed endpoint
    @Put('/update/incjobscompleted/:id')
    async IncTechTeamNrJobsCompleted(@Param() params):Promise<boolean> {
        //return this.apiTechTeamService.incTechTeamNrJobsCompleted(parseInt(params.id));
        return true;
    }

    //update Tech Team rating endpoint
    @Put('/update/ratingjobs/:id')
    async UpdateTechTeamRatingJobs(@Param() params,@Body() ratingJobs: number):Promise<boolean> {
        //return this.apiTechTeamService.updateTechTeamRatingJobs(parseInt(params.id),ratingJobs["ratingJobs"]);
        return true;
    }
}
