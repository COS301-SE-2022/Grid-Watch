export class GetTicketQuery{
    constructor(public readonly ticketId){}
}

export class GetTicketsQuery{

}

export class GetTicketsSortByDateQuery{

}

export class GetTicketsSortByIssueQuery{

}

export class GetTicketsSortByLocationQuery{

}

export class GetTicketsSortByCityQuery{

}

export class GetTicketsSortByStatusQuery{

}

export class GetTicketsSortByUpvotesQuery{

}

export class GetTicketsDispatchedQuery{

}

export class GetStatusQuery{
    constructor(public readonly status){}
}

export class GetIssueQuery{
    constructor(public readonly issue){}
}

export class GetCityTicketQuery{
    constructor(public readonly city){}
}

export class CloseTicketQuery{
    constructor(public readonly ticketId){}
}

export class GetAllPicturesQuery{
    constructor(public readonly ticketId){}
}

export class GetPictureQuery{
    constructor(public readonly ticketId){}
}

export class GetAllSubtasksQuery{
    constructor(public readonly ticketId){}
}