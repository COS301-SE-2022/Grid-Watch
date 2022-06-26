import { Logger } from "@nestjs/common";
import { TicketDto } from "@grid-watch/api/ticket/api/shared/ticketdto";

export class CreateTicketCommand{
    constructor(
        public readonly ticketDto : TicketDto
        
        
        ){
            Logger.log("Part 2 passed");
        }

}

export class UpdateTicketCommand{
    constructor(
        public readonly ticketDto : TicketDto
        ){}

}

export class DeleteTicketCommand{
    constructor( public readonly ticketId){}
}

export class UpdateTicketStatusCommand{
    constructor(public readonly TicketId, public readonly Status){}
}

export class UpdateTicketCreateDateCommand{
    constructor(public readonly TicketId, public readonly CreateDate){}
}

export class UpdateTicketCloseDateCommand{
    constructor(public readonly TicketId, public readonly CloseDate){}
}

export class UpdateTicketTypeCommand{
    constructor(public readonly TicketId, public readonly Type){}
}

export class UpdateTicketLocationCommand{
    constructor(public readonly TicketId, public readonly Location){}
}

export class UpdateTicketCostCommand{
    constructor(public readonly TicketId, public readonly Cost){}
}

export class UpdateTicketDescriptionCommand{
    constructor(public readonly TicketId, public readonly Description){}
}

export class UpdateTicketRepairTimeCommand{
    constructor(public readonly TicketId, public readonly RepairTime){}
}

export class UpdateTicketUpVotesCommand{
    constructor(public readonly TicketId, public readonly UpVotes){}
}

export class IncUpvotesCommand{
    constructor(public readonly TicketId){}
}

export class CreatePictureCommand{
    constructor(public readonly TicketId, public readonly img_link){}
}

export class UpdatePictureCommand{
    constructor(public readonly PictureId, public readonly img_link){}
}

export class DeletePictureCommand{
    constructor(public readonly PictureId){}
}
