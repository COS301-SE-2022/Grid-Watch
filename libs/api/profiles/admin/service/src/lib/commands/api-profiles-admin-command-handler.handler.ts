import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProfilesAdminRepositoryDataAccess } from '@grid-watch/api/profiles/admin/repository';
import { AddAdminCityCommand,CreateAdminCommand,DeleteAdminCommand,UpdateAdminCitiesCommand,UpdateAdminCommand,UpdateAdminContactNrCommand,UpdateAdminEmailCommand,UpdateAdminNameCommand,UpdateAdminPasswordCommand,VerifyAdminPasswordCommand} from './api-profiles-admin-command.command';

@CommandHandler(AddAdminCityCommand)
export class AddAdminCityHandler implements ICommandHandler<AddAdminCityCommand>{
    constructor (private readonly repository:ApiProfilesAdminRepositoryDataAccess){
        
    }
    async execute(command: AddAdminCityCommand) {
        const{ adminId, city}= command;
        return this.repository.AddAdminCity(adminId,city);
    }
}

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand>{
    constructor (private readonly repository:ApiProfilesAdminRepositoryDataAccess){
        
    }
    async execute(command: CreateAdminCommand) {
        const{ adminDto}= command;
        return this.repository.createAdmin(adminDto);
    }
}

@CommandHandler(DeleteAdminCommand)
export class DeleteAdminHandler implements ICommandHandler<DeleteAdminCommand>{

    constructor (private readonly repository:ApiProfilesAdminRepositoryDataAccess){

    }
    async execute(command: DeleteAdminCommand) {
        const{adminId}= command;
        return this.repository.deleteAdmin(adminId)
    }
}

@CommandHandler(UpdateAdminCitiesCommand)
export class UpdateAdminCitiesHandler implements ICommandHandler<UpdateAdminCitiesCommand>{

    constructor (private readonly repository: ApiProfilesAdminRepositoryDataAccess){}

    async execute(command: UpdateAdminCitiesCommand){
        const{adminId,adminCities} = command;
        return this.repository.updateAdmin(adminId,adminCities);
    }
}

@CommandHandler(UpdateAdminCommand)
export class UpdateAdminHandler implements ICommandHandler<UpdateAdminCommand>{

    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess){}

    async execute(command: UpdateAdminCommand) {
        const{adminId,adminDto} = command;
        return this.repository.updateAdmin(adminId,adminDto);
    }
}

@CommandHandler(UpdateAdminContactNrCommand)
export class UpdateAdminContactNrHandler implements ICommandHandler<UpdateAdminContactNrCommand>{
    constructor(private readonly repository:ApiProfilesAdminRepositoryDataAccess){}

   async execute(command: UpdateAdminContactNrCommand) {
       const{adminId,adminCellNr} = command;
       return this.repository.updateAdminContactNr(adminId,adminCellNr);
   }
}

@CommandHandler(UpdateAdminEmailCommand)
export class UpdateAdminEmailHandler implements ICommandHandler<UpdateAdminEmailCommand>{
    constructor(private readonly repository:ApiProfilesAdminRepositoryDataAccess){}

   async execute(command: UpdateAdminEmailCommand) {
       const{adminId,adminEmail} = command;
       return this.repository.updateAdminEmail(adminId,adminEmail);
   }
}

@CommandHandler(UpdateAdminNameCommand)
export class UpdateAdminNameHandler implements ICommandHandler<UpdateAdminNameCommand>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess){}

    async execute(command: UpdateAdminNameCommand) {

        const{adminId,adminName} = command;
        return this.repository.updateAdminName(adminId,adminName);

    }
}

@CommandHandler(UpdateAdminPasswordCommand)
export class UpdateAdminPasswordHandler implements ICommandHandler<UpdateAdminPasswordCommand>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess){}

    async execute(command: UpdateAdminPasswordCommand) {

        const{adminId,newPassword} = command;
        return this.repository.updateAdminPassword(adminId,newPassword);

    }
}

@CommandHandler(VerifyAdminPasswordCommand)
export class VerifyAdminPasswordHandler implements ICommandHandler<VerifyAdminPasswordCommand>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess){}

    async execute(command: VerifyAdminPasswordCommand) {

        const{email,password} = command;
        return this.repository.verifyAdminPassword(email,password);

    }
}