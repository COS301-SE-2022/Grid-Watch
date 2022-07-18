import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetAllAssignedTicketsQuery,GetTechTeamContactNrQuery,GetTechTeamEmailQuery,GetTechTeamIdQuery,GetTechTeamNameQuery,GetTechTeamSpecialisationQuery,GetTechTeamsQuery,SearchTechTeamNameQuery} from './api-tech-team-query.query';
import { ApiProfilesTechTeamRepositoryDataAccess} from '@grid-watch/api/profiles/tech-team/repository';

@QueryHandler(GetAllAssignedTicketsQuery)
export class GetAllAssignedTicketsHandler implements IQueryHandler<GetAllAssignedTicketsQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(query: GetAllAssignedTicketsQuery){
        const {techTeamId} = query;
        return this.repository.getAllAssignedTickets(techTeamId);

    }
}

@QueryHandler(GetTechTeamContactNrQuery)
export class GetTechTeamContactNrHandler implements IQueryHandler<GetTechTeamContactNrQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(query: GetTechTeamContactNrQuery){
        const {techContactNr} = query;
        return this.repository.getTechTeamContactNr(techContactNr);

    }
}

@QueryHandler(GetTechTeamEmailQuery)
export class GetTechTeamEmailHandler implements IQueryHandler<GetTechTeamEmailQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(query: GetTechTeamEmailQuery){
        const {techEmail} = query;
        return this.repository.getTechTeamEmail(techEmail);

    }
}

@QueryHandler(GetTechTeamIdQuery)
export class GetTechTeamIdHandler implements IQueryHandler<GetTechTeamIdQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(query: GetTechTeamIdQuery){
        const {id} = query;
        return this.repository.getTechTeamId(id);

    }
}

@QueryHandler(GetTechTeamNameQuery)
export class GetTechTeamNameHandler implements IQueryHandler<GetTechTeamNameQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(query: GetTechTeamNameQuery){
        const {name} = query;
        return this.repository.getTechTeamName(name);

    }
}

@QueryHandler(GetTechTeamSpecialisationQuery)
export class GetTechTeamSpecialisationHandler implements IQueryHandler<GetTechTeamSpecialisationQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(query: GetTechTeamSpecialisationQuery){
        const {specs} = query;
        return this.repository.getTechTeamSpecialisation(specs);

    }
}

@QueryHandler(GetTechTeamsQuery)
export class GetTechTeamsHandler implements IQueryHandler<GetTechTeamsQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(){
        return this.repository.getTechTeams();
    }
}

@QueryHandler(SearchTechTeamNameQuery)
export class SearchTechTeamNameHandler implements IQueryHandler<SearchTechTeamNameQuery>{
    constructor(private readonly repository: ApiProfilesTechTeamRepositoryDataAccess ){}

    async execute(query: SearchTechTeamNameQuery){
        const {partial} = query;
        return this.repository.searchTechTeamName(partial);

    }
}