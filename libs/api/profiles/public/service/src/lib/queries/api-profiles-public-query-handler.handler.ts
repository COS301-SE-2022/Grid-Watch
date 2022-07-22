import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetAllUserTicketsQuery,GetUserEmailQuery,GetUserNameQuery,GetUserQuery} from './api-profiles-public-query.query';
import { ApiProfilesPublicRepositoryDataAccess } from '@grid-watch/api/profiles/public/repository';


@QueryHandler(GetUserEmailQuery)
export class GetUserEmailHandler implements IQueryHandler<GetUserEmailQuery>{
    constructor(private readonly repository: ApiProfilesPublicRepositoryDataAccess ){}

    async execute(query: GetUserEmailQuery){
        const {userEmail} = query;
        return this.repository.getUserEmail(userEmail);

    }


}

@QueryHandler(GetAllUserTicketsQuery)
export class GetAllUserTicketsHandler implements IQueryHandler<GetAllUserTicketsQuery>{
    constructor(private readonly repository: ApiProfilesPublicRepositoryDataAccess ){}

    async execute(query: GetAllUserTicketsQuery){
        const {userId} = query;
        return this.repository.getAllUserTickets(userId);

    }


}

@QueryHandler(GetUserNameQuery)
export class GetUserNameHandler implements IQueryHandler<GetUserNameQuery>{
    constructor(private readonly repository: ApiProfilesPublicRepositoryDataAccess ){}

    async execute(query: GetUserNameQuery){
        const {userName} = query;
        return this.repository.getUserName(userName);

    }
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery>{
    constructor(private readonly repository: ApiProfilesPublicRepositoryDataAccess ){}

    async execute(query: GetUserQuery){
        const {userId} = query;
        return this.repository.getUser(userId);

    }
}