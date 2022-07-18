import { Module } from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import { ApiProfilesTechTeamServiceService } from './api-profiles-tech-team-service.service';
import {VerifyPasswordHandler,AssignTicketHandler,CreateTechTeamHandler,IncTechTeamNrJobsCompletedHandler,DeleteTechTeamHandler,UpdateTechTeamNameHandler,UpdateTechTeamHandler,UpdateTechTeamContactNrHandler,UpdateTechTeamEmailHandler,UpdateTechTeamNrJobsCompletedHandler,UpdateTechTeamRatingJobsHandler,UpdateTechTeamSpecialisationHandler} from './commands/api-tech-team-command-handler.handler';
import {GetAllAssignedTicketsHandler,GetTechTeamContactNrHandler,GetTechTeamEmailHandler,GetTechTeamIdHandler,GetTechTeamNameHandler,GetTechTeamSpecialisationHandler,GetTechTeamsHandler,SearchTechTeamNameHandler} from './queries/api-tech-team-query-handler.handler';
import { ApiProfilesTechTeamRepositoryDataAccess } from '@grid-watch/api/profiles/tech-team/repository';

@Module({
  imports: [CqrsModule],
  providers: [ApiProfilesTechTeamServiceService,
  ApiProfilesTechTeamRepositoryDataAccess,
  CreateTechTeamHandler,
  DeleteTechTeamHandler,
  UpdateTechTeamContactNrHandler,
  UpdateTechTeamEmailHandler,
  UpdateTechTeamHandler,
  UpdateTechTeamNrJobsCompletedHandler,
  UpdateTechTeamSpecialisationHandler,
  UpdateTechTeamNameHandler,
  UpdateTechTeamRatingJobsHandler,
  IncTechTeamNrJobsCompletedHandler,
  VerifyPasswordHandler,
  AssignTicketHandler,
  GetAllAssignedTicketsHandler,
  GetTechTeamContactNrHandler,
  GetTechTeamEmailHandler,
  GetTechTeamIdHandler,
  GetTechTeamNameHandler,
  GetTechTeamSpecialisationHandler,
  GetTechTeamsHandler,
  SearchTechTeamNameHandler
  ],
  exports: [ApiProfilesTechTeamServiceService],
})
export class ApiProfilesTechTeamServiceModule {}
