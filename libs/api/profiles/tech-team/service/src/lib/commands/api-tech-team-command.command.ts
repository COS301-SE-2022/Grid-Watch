import { TechTeamDto } from "@grid-watch/api/profiles/tech-team/api/shared/techteamdto";
export class CreateTechTeamCommand{
    constructor(
        public readonly techTeamDto : TechTeamDto
    ){}
}

export class UpdateTechTeamCommand{
    constructor(
        public readonly techTeamId,
        public readonly techTeamDto: TechTeamDto
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