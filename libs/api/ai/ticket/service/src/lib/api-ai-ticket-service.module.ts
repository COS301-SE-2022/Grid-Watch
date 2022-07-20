import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAiTicketServiceService } from './api-ai-ticket-service.service';
import {GetIssueAIHandler} from './queries/api-ai-ticket-query-handler.handler';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
@Module({
  controllers: [],
  imports: [CqrsModule],
  providers: [ApiAiTicketServiceService,
              ApiTicketRepositoryDataAccess,
              GetIssueAIHandler],
  exports: [ApiAiTicketServiceService],
})
export class ApiAiTicketServiceModule {}
