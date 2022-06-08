import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
  import { techTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
  import {ApiProfilesTechTeamServiceService} from '@grid-watch/api/profiles/tech-team/service'
  
  //import { ApiProfilesTechTeamServiceService } from '@grid-watch/api/profiles/tech-team/service';
@Controller('techteam')
export class ApiProfilesTechTeamApiControllerController {
    constructor(private readonly apiTechTeamService:ApiProfilesTechTeamServiceService){}

    //Testing endpoint to test functionality
    @Get()
    testing(){
        return  "Testing Tech Team";
    }

    //create Tech Team endpoint
    @Post('/create')
    async CreateTechTeam(@Body() techTeam: techTeamDto){
        return this.apiTechTeamService.createTechTeam(techTeam.name,techTeam.email,techTeam.specialisation,techTeam.contact_number);
    }

    //update Teach Team endpoint 
    @Put('/update/:id')
    async UpdateTechTeam(@Param() params,@Body() techTeam: techTeamDto):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeam(parseInt(params.id),techTeam.name,techTeam.email,techTeam.specialisation,techTeam.contact_number);
    }

    //update Tech Team Name endpoint
    @Put('/update/name/:id')
    async UpdateTechTeamName(@Param() params,@Body() name: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamName(parseInt(params.id),name["name"]);
    }

    //update Tech Team email endpoint
    @Put('/update/email/:id')
    async UpdateTechTeamEmail(@Param() params,@Body() email: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamEmail(parseInt(params.id),email["email"]);
    }

    //update Tech Team specialisation endpoint
    @Put('/update/specialisation/:id')
    async UpdateTechTeamSpecialisation(@Param() params,@Body() specialisation: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamSpecialisation(parseInt(params.id),specialisation["specialisation"]);
    }

    //update Tech Team contact number endpoint
    @Put('/update/contactnr/:id')
    async UpdateTechTeamContactNr(@Param() params,@Body() ContactNr: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamContactNr(parseInt(params.id),ContactNr["ContactNr"]);
    }

    //update Tech Team number jobs completed endpoint
    @Put('/update/nrjobscompleted/:id')
    async UpdateTechTeamNrJobsCompleted(@Param() params,@Body() nrJobsCompleted: number):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamNrJobsCompleted(parseInt(params.id),nrJobsCompleted["nrJobsCompleted"]);
    }

    //Increment Tech Team number jobs completed endpoint
    @Put('/update/incjobscompleted/:id')
    async IncTechTeamNrJobsCompleted(@Param() params):Promise<boolean> {
        return this.apiTechTeamService.IncTechTeamNrJobsCompleted(parseInt(params.id));
    }

    //update Tech Team rating endpoint
    @Put('/update/ratingjobs/:id')
    async UpdateTechTeamRatingJobs(@Param() params,@Body() ratingJobs: number):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamRatingJobs(parseInt(params.id),ratingJobs["ratingJobs"]);
    }
}
