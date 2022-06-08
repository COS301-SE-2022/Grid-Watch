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