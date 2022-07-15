import { Injectable } from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {CreateAdminCommand,
        AddAdminCityCommand,
        VerifyAdminPasswordCommand,
        UpdateAdminCommand,
        UpdateAdminPasswordCommand,
        UpdateAdminNameCommand,
        UpdateAdminEmailCommand,
        UpdateAdminContactNrCommand,
        UpdateAdminCitiesCommand,
        DeleteAdminCommand
} from './commands/api-profiles-admin-command.command';
import{ GetAdminQuery,
        GetAdminNameQuery,
        GetAdminCellNrQuery,
        GetAdminEmailQuery,
        GetAdminCityQuery,
    } from './queries/api-profiles-admin-query.query';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';

@Injectable()
export class ApiProfilesAdminService {
    constructor(private commandBus: CommandBus,private queryBus: QueryBus){}

    /////////////////////////////////////////
    ////////////////Queries//////////////////
    /////////////////////////////////////////

    async getAdmin(adminId: number){
        return await this.queryBus.execute(new GetAdminQuery(adminId));
    }

    async getAdminName(adminName: string){
        return await this.queryBus.execute(new GetAdminNameQuery(adminName));
    }

    async getAdminCellNr(adminCellNr: string){
        return await this.queryBus.execute(new GetAdminCellNrQuery(adminCellNr));
    }

    async getAdminEmail(adminEmail: string){
        return await this.queryBus.execute(new GetAdminEmailQuery(adminEmail));
    }

    async getAdminCities(adminCity: string){
        return await this.queryBus.execute(new GetAdminCityQuery(adminCity));
    }

    /////////////////////////////////////////
    ////////////////commands/////////////////
    /////////////////////////////////////////

    async createAdmin(adminDto: AdminDto){
        return await this.commandBus.execute(new CreateAdminCommand(adminDto));
    }

    async addAdminCity(adminId: number, city: string){
        return await this.commandBus.execute(new AddAdminCityCommand(adminId,city));
    }

    async verifyAdminPassword(email: string, password: string){
        return await this.commandBus.execute(new VerifyAdminPasswordCommand(email,password));
    }

    async updateAdmin(adminId: number, adminDto: AdminDto){
        return await this.commandBus.execute(new UpdateAdminCommand(adminId,adminDto));
    }

    async updateAdminPassword(adminId: number, newPassword: string){
        return await this.commandBus.execute(new UpdateAdminPasswordCommand(adminId,newPassword));
    }

    async updateAdminName(userId: number, userName: string){
        return await this.commandBus.execute(new UpdateAdminNameCommand(userId,userName));
    }

    async updateAdminEmail(adminId: number, adminEmail: string){
        return await this.commandBus.execute(new UpdateAdminEmailCommand(adminId,adminEmail));
    }

    async updateAdminContactNr(adminId: number, adminCellNr: string){
        return await this.commandBus.execute(new UpdateAdminContactNrCommand(adminId,adminCellNr));
    }
    
    async updateAdminCities(adminId: number, adminCities: string[]){
        return await this.commandBus.execute(new UpdateAdminCitiesCommand(adminId,adminCities));
    }

    async deleteAdmin(adminId: number){
        return await this.commandBus.execute(new DeleteAdminCommand(adminId))
    }
}
