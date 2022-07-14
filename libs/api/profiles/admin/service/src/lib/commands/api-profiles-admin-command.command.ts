import { AdminDto } from "@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto";

export class CreateAdminCommand{
    constructor(
        public readonly adminDto : AdminDto
        ){}
}

export class AddAdminCityCommand{
    constructor(
        public readonly adminId,
        public readonly city,
        ){}
}

export class VerifyAdminPasswordCommand{
    constructor(
        public readonly email,
        public readonly password,
        ){}

}

export class UpdateAdminCommand{
    constructor( 
        public readonly adminId,
        public readonly adminDto: AdminDto,
        ){}
}

export class UpdateAdminPasswordCommand{
    constructor(
        public readonly adminId, 
        public readonly newPassword,
        ){}
}

export class UpdateAdminNameCommand{
    constructor(
        public readonly adminId, 
        public readonly adminName,
        ){}
}

export class UpdateAdminEmailCommand{
    constructor(
        public readonly adminId, 
        public readonly adminEmail,
        ){}
}

export class UpdateAdminContactNrCommand{
    constructor(
        public readonly adminId, 
        public readonly adminCellNr,
        ){}
}

export class UpdateAdminCitiesCommand{
    constructor(
        public readonly adminId, 
        public readonly adminCities,
        ){}
}

export class DeleteAdminCommand{
    constructor(
        public readonly adminId
        ){}
}
