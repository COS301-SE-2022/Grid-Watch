export class CreateTechTeamCommand{
    constructor(

        public readonly Name,
        public readonly Email,
        public readonly Specialisation,
        public readonly ContactNr,
        public readonly Password
    ){}
}

export class UpdateTechTeamCommand{
    constructor(
        public readonly techTeamId,
        public readonly name,
        public readonly email,
        public readonly specialisation,
        public readonly contactNr
    ){}
}

export class UpdateTechTeamNameCommand{
    constructor(
        public readonly techTeamId,
        public readonly name
    ){}
}

export class UpdateTechTeamEmailCommand{
    constructor( 
        public readonly techTeamId,
        public readonly email){}
}

export class UpdateTechTeamContactNrCommand{
    constructor( 
        public readonly techTeamId,
        public readonly contactNr){}
}

export class UpdateTechTeamSpecialisationCommand{
    constructor(
        public readonly techTeamId, 
        public readonly specialisation
        ){}
}

export class UpdateTechTeamNrJobsCompletedCommand{
    constructor(
        public readonly techTeamId,
        public readonly nrJobsCompleted
    ){}
}

export class IncTechTeamNrJobsCompletedCommand{
    constructor(
        public readonly techTeamId
    ){}
}

export class UpdateTechTeamRatingJobsCommand{
    constructor(
        public readonly techTeamId,
        public readonly ratingJobs
    ){}
}

export class DeleteTechTeamCommand{
    constructor(public readonly techTeamId){}
}