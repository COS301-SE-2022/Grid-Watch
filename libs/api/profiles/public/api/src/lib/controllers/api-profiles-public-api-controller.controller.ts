import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import {UserDto} from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto'; 

@Controller('public')
export class ApiProfilesPublicApiControllerController {

    //constructor(private readonly apiTicketService:ApiTicketService){}

    //Testing endpoint
    @Get()
    testing(){
        return  "Testing public endpoint";
    }

    //get endpiont to return a specific user
    @Get(':id')
    async getUser(@Param() params){
        //return this.apiPublicService.getTicket(parseInt(params.id));
    }

    //get endpoint to return a user with a specific name
    @Get('name/:name')
    async getUserName(@Param() params){
       // return this.apiPublicService.getUserName(params.name);
    }

    //get endpoint to return a user with a specific email
    @Get('email/:email')
    async getUserEmail(@Param() params){
       // return this.apiPublicService.getUserEmail(params.email);
    }

    //creating public users
    @Post('/create')
    async createUser(@Body() user: UserDto){
        //return this.apiPublicService.createUser(user);
    }

    //post endpoint to verify password
    @Post('/verify')
    async verifyUserPassword(@Body() user ):Promise<boolean>{
        //return this.apiPublicService.verifyUserPassword(user["email"],user["password"]);
        return true;
    }

    //put endpoint to updatePassword
    @Put('/update/password/:id')
    async updateUserPassword(@Param() params,@Body() userPassword: string):Promise<boolean> {
        //return this.apiPublicService.updateUserPassword(parseInt(params.id),userPassword["password"]);
        return true;
    }

    //update user endpoint
    @Put('/update/user/:id')
    async updateUser(@Param() params,@Body() user: UserDto):Promise<boolean> {
        //return this.apiPublicService.updateUser(parseInt(params.id),user);
        return true;
    }

    //update email endpoint
    @Put('/update/email/:id')
    async updateUserEmail(@Param() params,@Body() userEmail: string):Promise<boolean>{
        //return this.apiPublicService.updateUserEmail(parseInt(params.id),userEmail["email"]);
        return true;
    }

    //update user name closedate
    @Put('/update/name/:id')
    async updateUserName(@Param() params,@Body() userName: string):Promise<boolean> {
        //return this.apiPublicService.updateUserName(parseInt(params.id),userName["name"]);
        return true;
    }

    

    @Delete('/delete')
    async deleteUser(@Body() userId: number):Promise<boolean> {
        //return this.apiPublicService.deleteUser(userId["userId"]);
        return true;
    }
}