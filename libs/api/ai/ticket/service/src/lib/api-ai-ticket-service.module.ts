import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAiTicketServiceService } from './api-ai-ticket-service.service';
import {GetIssueAIHandler,GetTechTeamSpecialisationHandler,GetAllTicketsHandler} from './queries/api-ai-ticket-query-handler.handler';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {ApiProfilesTechTeamRepositoryDataAccess} from '@grid-watch/api/profiles/tech-team/repository';
@Module({
  controllers: [],
  imports: [CqrsModule],
  providers: [ApiAiTicketServiceService,
              ApiTicketRepositoryDataAccess,
              ApiProfilesTechTeamRepositoryDataAccess,
              GetIssueAIHandler,
              GetTechTeamSpecialisationHandler,
              GetAllTicketsHandler
            ],
  exports: [ApiAiTicketServiceService],
})
export class ApiAiTicketServiceModule {}
