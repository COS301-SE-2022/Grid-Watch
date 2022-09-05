import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProfilesPublicRepositoryDataAccess } from '@grid-watch/api/profiles/public/repository';
import {AddTicketUpvotedCommand,CreateUserCommand,DeleteUserCommand,ResetUserRating,ResetUserRatingCommand,UpdateUserCommand,UpdateUserEmailCommand,UpdateUserNameCommand,UpdateUserPasswordCommand,UpdateUserRatingCommand,VerifyUserPasswordCommand} from './api-profiles-public-command.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand>{
    constructor (private readonly repository:ApiProfilesPublicRepositoryDataAccess){
        
    }
    async execute(command: CreateUserCommand) {
        const{ userDto}= command;
        return this.repository.createUser(userDto);
    }
}

@CommandHandler(AddTicketUpvotedCommand)
export class AddTicketUpvotedHandler implements ICommandHandler<AddTicketUpvotedCommand>{
    constructor (private readonly repository:ApiProfilesPublicRepositoryDataAccess){
        
    }
    async execute(command: AddTicketUpvotedCommand) {
        const{ ticketId,userId}= command;
        return this.repository.addTicketUpvoted(userId,ticketId);
    }
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand>{

    constructor (private readonly repository:ApiProfilesPublicRepositoryDataAccess){

    }
    async execute(command: DeleteUserCommand) {
        const{userId}= command;
        return this.repository.deleteUser(userId)
    }
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{

    constructor (private readonly repository: ApiProfilesPublicRepositoryDataAccess){}

    async execute(command: UpdateUserCommand){
        const{userId,userDto} = command;
        return this.repository.updateUser(userId,userDto);
    }
}

@CommandHandler(UpdateUserRatingCommand)
export class UpdateUserRatingHandler implements ICommandHandler<UpdateUserRatingCommand>{

    constructor (private readonly repository: ApiProfilesPublicRepositoryDataAccess){}

    async execute(command: UpdateUserRatingCommand){
        const{userId,rating} = command;
        return this.repository.updateRating(userId,rating);
    }
}

@CommandHandler(ResetUserRatingCommand)
export class ResetUserRatingHandler implements ICommandHandler<ResetUserRatingCommand>{

    constructor (private readonly repository: ApiProfilesPublicRepositoryDataAccess){}

    async execute(command: ResetUserRatingCommand){
        const{userId} = command;
        return this.repository.resetUserRating(userId);
    }
}

@CommandHandler(UpdateUserEmailCommand)
export class UpdateUserEmailHandler implements ICommandHandler<UpdateUserEmailCommand>{

    constructor(private readonly repository: ApiProfilesPublicRepositoryDataAccess){}

    async execute(command: UpdateUserEmailCommand) {
        const{userId,userEmail} = command;
        return this.repository.updateUserEmail(userId,userEmail);
    }
}

@CommandHandler(UpdateUserNameCommand)
export class UpdateUserNameHandler implements ICommandHandler<UpdateUserNameCommand>{
    constructor(private readonly repository:ApiProfilesPublicRepositoryDataAccess){}

   async execute(command: UpdateUserNameCommand) {
       const{userId,userName} = command;
       return this.repository.updateUserName(userId,userName);
   }
}

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand>{
    constructor(private readonly repository:ApiProfilesPublicRepositoryDataAccess){}

   async execute(command: UpdateUserPasswordCommand) {
       const{userId,newPassword} = command;
       return this.repository.updateUserPassword(userId,newPassword);
   }
}

@CommandHandler(VerifyUserPasswordCommand)
export class VerifyUserPasswordHandler implements ICommandHandler<VerifyUserPasswordCommand>{
    constructor(private readonly repository: ApiProfilesPublicRepositoryDataAccess){}

    async execute(command: VerifyUserPasswordCommand) {

        const{email,password} = command;
        return this.repository.verifyUserPassword(email,password);

    }
}