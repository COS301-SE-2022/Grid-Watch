export class GetAdminQuery{
    constructor(public readonly adminId){}
}

export class GetAdminNameQuery{
    constructor(public readonly adminName){}
}

export class GetAdminCellNrQuery{
    constructor(public readonly adminCellNr){}
}

export class GetAdminEmailQuery{
    constructor(public readonly adminEmail){}
}

export class GetAdminCityQuery{
    constructor(public readonly adminCity){}
}

export class GetAllAdminsQuery{

}

export class SearchAdminNameQuery{
    constructor(public readonly partial){}
}