import { Module } from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import { ApiProfilesTechTeamServiceService } from './api-profiles-tech-team-service.service';
import {createTechTeamHandler,IncTechTeamNrJobsCompletedHandler,deleteTechTeamHandler,updateTechTeamNameHandler,updateTechTeamHandler,updateTechTeamContactNrHandler,updateTechTeamEmailHandler,updateTechTeamNrJobsCompletedHandler,updateTechTeamRatingJobsHandler,updateTechTeamSpecialisationHandler} from './commands/api-tech-team-command-handler.handler';
import { ApiProfilesTechTeamRepositoryDataAccess } from '@grid-watch/api/profiles/tech-team/repository';

@Module({
  imports: [CqrsModule],
  providers: [ApiProfilesTechTeamServiceService,
  ApiProfilesTechTeamRepositoryDataAccess,
  createTechTeamHandler,
  deleteTechTeamHandler,
  updateTechTeamContactNrHandler,
  updateTechTeamEmailHandler,
  updateTechTeamHandler,
  updateTechTeamNrJobsCompletedHandler,
  updateTechTeamSpecialisationHandler,
  updateTechTeamNameHandler,
  updateTechTeamRatingJobsHandler,
  IncTechTeamNrJobsCompletedHandler
  ],
  exports: [ApiProfilesTechTeamServiceService],
})
export class ApiProfilesTechTeamServiceModule {}
