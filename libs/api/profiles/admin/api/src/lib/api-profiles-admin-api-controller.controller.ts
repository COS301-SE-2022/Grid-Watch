import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiProfilesAdminService } from '@grid-watch/api/profiles/admin/service';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';

@Controller('admin')
export class ApiProfilesAdminApiController {

    constructor(private readonly apiAdminService:ApiProfilesAdminService){}

    //Testing endpoint
    @Get()
    testing(){
        return  "Testing admin endpoint";
    }

    //creating admin users
    @Post('/create')
    async createTicket(@Body() admin: AdminDto){
        return this.apiAdminService.createAdmin(admin);
    }

    //get endpiont to return a specific admin
    @Get(':id')
    async getUser(@Param() params){
        return this.apiAdminService.getAdmin(parseInt(params.id));
    }

    //get endpoint to return a admin with a specific name
    @Get('name/:name')
    async getUserName(@Param() params){
        return this.apiAdminService.getAdminName(params.name);
    }

    //get endpoint to return a admin with a specific cellNr
    @Get('cell/:cellNr')
    async getAdminCellNr(@Param() params){
        return this.apiAdminService.getAdminCellNr(params.cellNr);
    }

    //get endpoint to return a admin with a specific email
    @Get('email/:email')
    async getAdminEmail(@Param() params){
        return this.apiAdminService.getAdminEmail(params.email);
    }

    //get endpoint to return a admin with a specific cities
    @Get('cities/:cities')
    async getAdminCities(@Param() params){
        return this.apiAdminService.getAdminCities(params.cities);
    }

    //post endpoint to verify password
    @Post('/verify')
    async verifyAdminPassword(@Body() params : AdminDto ){
        return this.apiAdminService.verifyAdminPassword(params["email"],params["password"]);
    }

    //put endpoint to add admin cities
    @Put('/add/city/:id')
    async addAdminCity(@Param() params,@Body() city: string){
        return this.apiAdminService.addAdminCity(parseInt(params.id),city["city"]);
    }

    //update admin password
    @Put('/update/password/:id')
    async updateAdminPassword(@Param() params,@Body() pass: string){
        return this.apiAdminService.updateAdminPassword(parseInt(params.id),pass["newPassword"]);
    }

    //update admin endpoint
    @Put('/update/admin/:id')
    async updateAdmin(@Param() params,@Body() adminDto: AdminDto){
        return this.apiAdminService.updateAdmin(parseInt(params.id),adminDto);
    }

    //update admin name
    @Put('/update/name/:id')
    async updateAdminName(@Param() params,@Body() adminName: string){
        return this.apiAdminService.updateAdminName(parseInt(params.id),adminName["name"]);
    }

    //update admin email
    @Put('/update/email/:id')
    async updateAdminEmail(@Param() params,@Body() adminEmail: string){
        return this.apiAdminService.updateAdminEmail(parseInt(params.id),adminEmail["email"]);
    }

    //update admin contactNr
    @Put('/update/cell/:id')
    async updateAdminContactNr(@Param() params,@Body() adminCellNr: string){
        return this.apiAdminService.updateAdminContactNr(parseInt(params.id),adminCellNr["cell"]);
    }

    //update admin cities
    @Put('/update/cities/:id')
    async updateAdminCities(@Param() params,@Body() cities: string[]){
        return this.apiAdminService.updateAdminCities(parseInt(params.id),cities);
    }
    
    //delete admin endpoint
    @Delete('/delete')
    async deleteAdmin(@Body() adminId: number) {
        return this.apiAdminService.deleteAdmin(adminId["adminId"]);
    }
}