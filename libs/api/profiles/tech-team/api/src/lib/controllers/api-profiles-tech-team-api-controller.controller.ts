import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
  import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
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
    async updateTechTeamContactNr(@Param() params,@Body() ContactNr: string):Promise<boolean> {
        return this.apiTechTeamService.updateTechTeamContactNr(parseInt(params.id),ContactNr["ContactNr"]);
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
}
