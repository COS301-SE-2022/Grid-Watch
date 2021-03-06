import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiProfilesPublicService } from '@grid-watch/api/profiles/public/service';
import {UserDto} from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto'; 

@Controller('public')
export class ApiProfilesPublicApiController {

    constructor(private readonly apiProfilesPublicService:ApiProfilesPublicService){}

    //Testing endpoint
    @Get()
    testing(){
        return  "Testing public endpoint";
    }

    //get endpoint to return all tickets of a specific user
    @Get('tickets/:userId')
    async getAllUserTickets(@Param() params){
        return this.apiProfilesPublicService.getAllUserTickets(params.userId);
    }

    //get endpiont to return a specific user
    @Get(':id')
    async getUser(@Param() params){
        return this.apiProfilesPublicService.getUser(parseInt(params.id));
    }

    //get endpoint to return a user with a specific name
    @Get('name/:name')
    async getUserName(@Param() params){
        return this.apiProfilesPublicService.getUserName(params.name);
    }

    //get endpoint to return a user with a specific email
    @Get('email/:email')
    async getUserEmail(@Param() params){
        return this.apiProfilesPublicService.getUserEmail(params.email);
    }

    //creating public users
    @Post('/create')
    async createUser(@Body() user: UserDto){
        return this.apiProfilesPublicService.createUser(user);
    }

    //post endpoint to verify password
    @Post('/verify')
    async verifyUserPassword(@Body() user: UserDto ):Promise<boolean>{
        return this.apiProfilesPublicService.verifyUserPassword(user["email"],user["password"]);
    }

    //add upvote to ticket
    @Put('/add/upvote/:userId')
    async addTicketUpvoted(@Param() params,@Body() ticketId: number):Promise<boolean> {
        return this.apiProfilesPublicService.addTicketUpvoted(parseInt(params.userId),ticketId["ticketId"]);
    }

    //put endpoint to updatePassword
    @Put('/update/password/:id')
    async updateUserPassword(@Param() params,@Body() userPassword: string):Promise<boolean> {
        return this.apiProfilesPublicService.updateUserPassword(parseInt(params.id),userPassword["password"]);
    }

    //update user endpoint
    @Put('/update/user/:id')
    async updateUser(@Param() params,@Body() user: UserDto):Promise<boolean> {
        return this.apiProfilesPublicService.updateUser(parseInt(params.id),user);
    }

    //update email endpoint
    @Put('/update/email/:id')
    async updateUserEmail(@Param() params,@Body() userEmail: string):Promise<boolean>{
        return this.apiProfilesPublicService.updateUserEmail(parseInt(params.id),userEmail["email"]);
    }

    //update user name closedate
    @Put('/update/name/:id')
    async updateUserName(@Param() params,@Body() userName: string):Promise<boolean> {
        return this.apiProfilesPublicService.updateUserName(parseInt(params.id),userName["name"]);
    }

    @Delete('/delete')
    async deleteUser(@Body() userId: number):Promise<boolean> {
        return this.apiProfilesPublicService.deleteUser(userId["userId"]);
    }
}