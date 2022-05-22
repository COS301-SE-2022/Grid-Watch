export class GetTicketQuery{
    constructor(public readonly ticketId){}
}

export class GetTicketsQuery{

}

export class GetTicketsDispatchedQuery{

}

export class GetStatusQuery{
    constructor(public readonly Status){}
}

export class GetCityTicketQuery{
    constructor(public readonly City){}
}

export class CloseTicketQuery{
    constructor(public readonly TicketId){}
}