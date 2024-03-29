import { Injectable } from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {VerifyUserPasswordCommand,
        UpdateUserCommand,
        UpdateUserPasswordCommand,
        UpdateUserNameCommand,
        UpdateUserRatingCommand,
        ResetUserRatingCommand,
        UpdateUserEmailCommand,
        DeleteUserCommand,
        CreateUserCommand,
        AddTicketUpvotedCommand,
        IncUserRatingCommand,
        DecUserRatingCommand,
} from './commands/api-profiles-public-command.command';
import{ GetUserQuery,
        GetUserNameQuery,
        GetUserEmailQuery,
        GetAllUserTicketsQuery} from './queries/api-profiles-public-query.query';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';

@Injectable()
export class ApiProfilesPublicService {

    constructor(private commandBus: CommandBus,private queryBus: QueryBus){}

    /////////////////////////////////////////
    ////////////////Queries//////////////////
    /////////////////////////////////////////

    async getUser(userId: number){
        return await this.queryBus.execute(new GetUserQuery(userId));
    }

    async getUserName(userName: string){
        return await this.queryBus.execute(new GetUserNameQuery(userName));
    }

    async getUserEmail(userEmail: string){
        return await this.queryBus.execute(new GetUserEmailQuery(userEmail));
    }

    async getAllUserTickets(userId : number){
        return await this.queryBus.execute(new GetAllUserTicketsQuery(userId));
    }



    /////////////////////////////////////////
    ////////////////commands/////////////////
    /////////////////////////////////////////

    async createUser(userDto: UserDto){
        return await this.commandBus.execute(new CreateUserCommand(userDto));
    }

    async addTicketUpvoted(userId : number, ticketId: number){
        return await this.commandBus.execute(new AddTicketUpvotedCommand(userId, ticketId));
    }

    async verifyUserPassword(email: string, password: string){
        return await this.commandBus.execute(new VerifyUserPasswordCommand(email,password));
    }

    async updateUser(userId: number, userDto: UserDto){
        return await this.commandBus.execute(new UpdateUserCommand(userId,userDto));
    }

    async updateUserPassword(userId: number, newPassword: string){
        return await this.commandBus.execute(new UpdateUserPasswordCommand(userId,newPassword));
    }

    async updateUserName(userId: number, userName: string){
        return await this.commandBus.execute(new UpdateUserNameCommand(userId,userName));
    }

    async updateUserRating(userId: number, rating: number){
        return await this.commandBus.execute(new UpdateUserRatingCommand(userId,rating));
    }

    async incUserRating(userId: number){
        return await this.commandBus.execute(new IncUserRatingCommand(userId));
    }

    async decUserRating(userId: number){
        return await this.commandBus.execute(new DecUserRatingCommand(userId));
    }

    async resetUserRating(userId: number){
        return await this.commandBus.execute(new ResetUserRatingCommand(userId));
    }

    async updateUserEmail(userId: number, userEmail: string){
        return await this.commandBus.execute(new UpdateUserEmailCommand(userId,userEmail));
    }
    

    async deleteUser(userId: number){
        return await this.commandBus.execute(new DeleteUserCommand(userId))
    }
}
