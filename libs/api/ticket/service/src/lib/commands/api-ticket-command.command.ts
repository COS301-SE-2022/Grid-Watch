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
        public readonly upVotes
        
        
        ){}

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
        public readonly upVotes
        
        
        ){}

}

export class DeleteTicketCommand{
    constructor( public readonly ticketId){}
}