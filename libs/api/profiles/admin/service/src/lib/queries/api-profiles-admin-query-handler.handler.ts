import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchAdminNameQuery,GetAllAdminsQuery,GetAdminCellNrQuery,GetAdminCityQuery,GetAdminEmailQuery,GetAdminNameQuery,GetAdminQuery} from './api-profiles-admin-query.query';
import { ApiProfilesAdminRepositoryDataAccess} from '@grid-watch/api/profiles/admin/repository';

@QueryHandler(GetAdminCellNrQuery)
export class GetAdminCellNrHandler implements IQueryHandler<GetAdminCellNrQuery>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess ){}

    async execute(query: GetAdminCellNrQuery){
        const {adminCellNr} = query;
        return this.repository.getAdminContactNr(adminCellNr);

    }


}

@QueryHandler(SearchAdminNameQuery)
export class SearchAdminNameHandler implements IQueryHandler<SearchAdminNameQuery>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess ){}

    async execute(query: SearchAdminNameQuery){
        const {partial} = query;
        return this.repository.searchAdminName(partial);

    }
}

@QueryHandler(GetAllAdminsQuery)
export class GetAllAdminsHandler implements IQueryHandler<GetAllAdminsQuery>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess ){}

    async execute(){
        return this.repository.getAllAdmins();

    }
}

@QueryHandler(GetAdminCityQuery)
export class GetAdminCityHandler implements IQueryHandler<GetAdminCityQuery>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess ){}

    async execute(query: GetAdminCityQuery){
        const {adminCity} = query;
        return this.repository.getAdminCities(adminCity);

    }
}

@QueryHandler(GetAdminEmailQuery)
export class GetAdminEmailHandler implements IQueryHandler<GetAdminEmailQuery>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess ){}

    async execute(query: GetAdminEmailQuery){
        const {adminEmail} = query;
        return this.repository.getAdminEmail(adminEmail);

    }
}

@QueryHandler(GetAdminNameQuery)
export class GetAdminNameHandler implements IQueryHandler<GetAdminNameQuery>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess ){}

    async execute(query: GetAdminNameQuery){
        const {adminName} = query;
        return this.repository.getAdminName(adminName);

    }
}

@QueryHandler(GetAdminQuery)
export class GetAdminHandler implements IQueryHandler<GetAdminQuery>{
    constructor(private readonly repository: ApiProfilesAdminRepositoryDataAccess ){}

    async execute(query: GetAdminQuery){
        const {adminId} = query;
        return this.repository.getAdmin(adminId);

    }
}