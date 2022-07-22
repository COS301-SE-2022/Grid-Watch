import { UserDto } from "@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto";

export class CreateUserCommand{
    constructor(
        public readonly userDto : UserDto
        ){}
}

export class VerifyUserPasswordCommand{
    constructor(
        public readonly email,
        public readonly password,
        ){}

}

export class AddTicketUpvotedCommand{
    constructor(
        public readonly userId,
        public readonly ticketId,
    ){}
}

export class UpdateUserCommand{
    constructor( 
        public readonly userId,
        public readonly userDto: UserDto,
        ){}
}

export class UpdateUserPasswordCommand{
    constructor(
        public readonly userId, 
        public readonly newPassword,
        ){}
}

export class UpdateUserNameCommand{
    constructor(
        public readonly userId, 
        public readonly userName,
        ){}
}

export class UpdateUserEmailCommand{
    constructor(
        public readonly userId, 
        public readonly userEmail,
        ){}
}

export class DeleteUserCommand{
    constructor(
        public readonly userId
        ){}
}
