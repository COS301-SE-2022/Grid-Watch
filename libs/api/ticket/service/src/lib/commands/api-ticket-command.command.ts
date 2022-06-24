import { Logger } from "@nestjs/common";

export class CreateTicketCommand{
    constructor(
        public readonly status,
        public readonly createDate,
        public readonly closeDate,
        public readonly type,
        public readonly city,
        public readonly location,
        public readonly cost,
        public readonly description,
        public readonly repairTime,
        public readonly upVotes,
        
        
        ){
            Logger.log("Part 2 passed");
        }

}

export class UpdateTicketCommand{
    constructor(
        public readonly ticketId,
        public readonly status,
        public readonly createDate,
        public readonly closeDate,
        public readonly type,
        public readonly city,
        public readonly location,
        public readonly cost,
        public readonly description,
        public readonly repairTime,
        public readonly upVotes,
        
        
        ){}

}

export class DeleteTicketCommand{
    constructor( public readonly ticketId){}
}

export class UpdateTicketStatusCommand{
    constructor(public readonly ticketId, public readonly status){}
}

export class UpdateTicketCreateDateCommand{
    constructor(public readonly ticketId, public readonly createDate){}
}

export class UpdateTicketCloseDateCommand{
    constructor(public readonly ticketId, public readonly closeDate){}
}

export class UpdateTicketTypeCommand{
    constructor(public readonly ticketId, public readonly type){}
}

export class UpdateTicketLocationCommand{
    constructor(public readonly ticketId, public readonly location){}
}

export class UpdateTicketCostCommand{
    constructor(public readonly ticketId, public readonly cost){}
}

export class UpdateTicketDescriptionCommand{
    constructor(public readonly ticketId, public readonly description){}
}

export class UpdateTicketRepairTimeCommand{
    constructor(public readonly ticketId, public readonly repairTime){}
}

export class UpdateTicketUpVotesCommand{
    constructor(public readonly ticketId, public readonly upVotes){}
}

export class IncUpvotesCommand{
    constructor(public readonly ticketId){}
}

export class CreatePictureCommand{
    constructor(public readonly ticketId, public readonly imgLink){}
}

export class UpdatePictureCommand{
    constructor(public readonly pictureId, public readonly imgLink){}
}

export class DeletePictureCommand{
    constructor(public readonly pictureId){}
}
