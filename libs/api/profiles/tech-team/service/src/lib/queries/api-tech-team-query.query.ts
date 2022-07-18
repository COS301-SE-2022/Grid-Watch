export class GetTechTeamsQuery{

}

export class GetTechTeamIdQuery{
    constructor(public readonly id){}
}

export class GetTechTeamNameQuery{
    constructor(public readonly name){}
}

export class SearchTechTeamNameQuery{
    constructor(public readonly partial){}
}

export class GetTechTeamEmailQuery{
    constructor(public readonly techEmail){}
}

export class GetTechTeamSpecialisationQuery{
    constructor(public readonly specs){}
}

export class GetTechTeamContactNrQuery{
    constructor(public readonly techContactNr){}
}

export class GetAllAssignedTicketsQuery{
    constructor(public readonly techTeamId){}
}






    

