export class CreateTechTeamCommand{
    constructor(
        public readonly Name,
        public readonly Email,
        public readonly Specialisation,
        public readonly ContactNr
    ){}
}

export class UpdateTechTeamCommand{
    constructor(
        public readonly TechTeamId,
        public readonly Name,
        public readonly Email,
        public readonly Specialisation,
        public readonly ContactNr
    ){}
}

export class UpdateTechTeamNameCommand{
    constructor(
        public readonly TechTeamId,
        public readonly Name
    ){}
}

export class UpdateTechTeamEmailCommand{
    constructor( 
        public readonly TechTeamId,
        public readonly Email){}
}

export class UpdateTechTeamContactNrCommand{
    constructor( 
        public readonly TechTeamId,
        public readonly ContactNr){}
}

export class UpdateTechTeamSpecialisationCommand{
    constructor(
        public readonly TechTeamId, 
        public readonly Specialisation,
        ){}
}

export class UpdateTechTeamNrJobsCompletedCommand{
    constructor(
        public readonly TechTeamId,
        public readonly NrJobsCompleted
    ){}
}

export class IncTechTeamNrJobsCompletedCommand{
    constructor(
        public readonly TechTeamId
    ){}
}

export class UpdateTechTeamRatingJobsCommand{
    constructor(
        public readonly TechTeamId,
        public readonly RatingJobs
    ){}
}

export class DeleteTechTeamCommand{
    constructor(public readonly TechTeamId){}
}