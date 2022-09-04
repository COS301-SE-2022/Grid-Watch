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
import { ApiProfilesPublicService } from '@grid-watch/api/profiles/public/service';
import {UserDto} from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto'; 
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '@grid-watch/api/authentication';

@Controller('public')
export class ApiProfilesPublicApiController {

    constructor(
        private readonly apiProfilesPublicService:ApiProfilesPublicService,
        private jwtTokenService: JwtService){}

    //Testing endpoint
    @UseGuards(JwtAuthGuard)
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
    async verifyUserPassword(@Body() user: UserDto ) {
        const exists = this.apiProfilesPublicService.verifyUserPassword(user["email"],user["password"]); 
        if (exists)
        {
            const payload = {
                id : user.id,
                email : user.email,
            }
            Logger.log(
                {
                    access_token: this.jwtTokenService.sign(payload)
                }
            )
            return {
                access_token: this.jwtTokenService.signAsync(payload)
            }
        }
        else
            return null 
    }

    //add upvote to ticket
    @Put('/add/upvote/:userId')
    async addTicketUpvoted(@Param() params,@Body() ticketId: number):Promise<boolean> {
        return this.apiProfilesPublicService.addTicketUpvoted(parseInt(params.userId),ticketId["ticketId"]);
    }

    //put endpoint to updatePassword
    @Put('/update/password/:id')
    async updateUserPassword(@Param() params,@Body() userPassword: string) {
        return this.apiProfilesPublicService.updateUserPassword(parseInt(params.id),userPassword["password"]);
    }

    //update user endpoint
    @Put('/update/user/:id')
    async updateUser(@Param() params,@Body() user: UserDto) {
        return this.apiProfilesPublicService.updateUser(parseInt(params.id),user);
    }

    //update email endpoint
    @Put('/update/email/:id')
    async updateUserEmail(@Param() params,@Body() userEmail: string){
        return this.apiProfilesPublicService.updateUserEmail(parseInt(params.id),userEmail["email"]);
    }

    //update user name closedate
    @Put('/update/name/:id')
    async updateUserName(@Param() params,@Body() userName: string) {
        return this.apiProfilesPublicService.updateUserName(parseInt(params.id),userName["name"]);
    }

    @Delete('/delete')
    async deleteUser(@Body() userId: number){
        return this.apiProfilesPublicService.deleteUser(userId["userId"]);
    }
}