import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiProfilesAdminService } from '@grid-watch/api/profiles/admin/service';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '@grid-watch/api/authentication';

@Controller('admin')
export class ApiProfilesAdminApiController {

    constructor(private readonly apiAdminService:ApiProfilesAdminService,
                private jwtTokenService: JwtService){}

    //Testing endpoint
    @Get()
    testing(){
        return  "Testing admin endpoint";
    }

    //creating admin users
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createAdmin(@Body() admin: AdminDto){
        return this.apiAdminService.createAdmin(admin);
    }

    //get endpiont to return a specific admin
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getAdmin(@Param() params){
        return this.apiAdminService.getAdmin(parseInt(params.id));
    }

    //get endpiont to return all admins
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    async getAllAdmins(){
        return this.apiAdminService.getAllAdmins();
    }

    //search admin name endpoint
    @UseGuards(JwtAuthGuard)
    @Get('/name/:name')
    async searchAdminName(@Param() params){
        return this.apiAdminService.searchAdminName(params.name);
    }

    //get endpoint to return a admin with a specific name
    @UseGuards(JwtAuthGuard)
    @Get('name/:name')
    async getAdminName(@Param() params){
        return this.apiAdminService.getAdminName(params.name);
    }

    //get endpoint to return a admin with a specific cellNr
    @UseGuards(JwtAuthGuard)
    @Get('cell/:cellNr')
    async getAdminCellNr(@Param() params){
        return this.apiAdminService.getAdminCellNr(params.cellNr);
    }

    //get endpoint to return a admin with a specific email
    @UseGuards(JwtAuthGuard)
    @Get('email/:email')
    async getAdminEmail(@Param() params){
        return this.apiAdminService.getAdminEmail(params.email);
    }

    //get endpoint to return a admin with a specific cities
    @UseGuards(JwtAuthGuard)
    @Get('cities/:cities')
    async getAdminCities(@Param() params){
        return this.apiAdminService.getAdminCities(params.cities);
    }

    //post endpoint to verify password
    @Post('/verify')
    async verifyAdminPassword(@Body() params : AdminDto ){
        const exist = await this.apiAdminService.verifyAdminPassword(params["email"],params["password"]);        
        if (exist)
        {
            const payload = {
                id: params.id,
                email: params.email
            }
            const token = {
                access_token: "Bearer " + this.jwtTokenService.sign(payload)
            };
            return token;
        }
        else
            return null 
    }

    //put endpoint to add admin cities
    @UseGuards(JwtAuthGuard)
    @Put('/add/city/:id')
    async addAdminCity(@Param() params,@Body() city: string){
        return this.apiAdminService.addAdminCity(parseInt(params.id),city["city"]);
    }

    //update admin password
    @UseGuards(JwtAuthGuard)
    @Put('/update/password/:id')
    async updateAdminPassword(@Param() params,@Body() pass: string){
        return this.apiAdminService.updateAdminPassword(parseInt(params.id),pass["newPassword"]);
    }

    //update admin endpoint
    @UseGuards(JwtAuthGuard)
    @Put('/update/admin/:id')
    async updateAdmin(@Param() params,@Body() adminDto: AdminDto){
        return this.apiAdminService.updateAdmin(parseInt(params.id),adminDto);
    }

    //update admin name
    @UseGuards(JwtAuthGuard)
    @Put('/update/name/:id')
    async updateAdminName(@Param() params,@Body() adminName: string){
        return this.apiAdminService.updateAdminName(parseInt(params.id),adminName["name"]);
    }

    //update admin email
    @UseGuards(JwtAuthGuard)
    @Put('/update/email/:id')
    async updateAdminEmail(@Param() params,@Body() adminEmail: string){
        return this.apiAdminService.updateAdminEmail(parseInt(params.id),adminEmail["email"]);
    }

    //update admin contactNr
    @UseGuards(JwtAuthGuard)
    @Put('/update/cell/:id')
    async updateAdminContactNr(@Param() params,@Body() adminCellNr: string){
        return this.apiAdminService.updateAdminContactNr(parseInt(params.id),adminCellNr["cell"]);
    }

    //update admin cities
    @UseGuards(JwtAuthGuard)
    @Put('/update/cities/:id')
    async updateAdminCities(@Param() params,@Body() cities: string[]){
        return this.apiAdminService.updateAdminCities(parseInt(params.id),cities["cities"]);
    }
    
    //delete admin endpoint
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async deleteAdmin(@Body() adminId: number) {
        return this.apiAdminService.deleteAdmin(adminId["adminId"]);
    }
}