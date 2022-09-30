import { Module } from '@nestjs/common';
import {ApiAiTicketRepositoryDataAccess} from  './api-ai-ticket-repository-data-access'

@Module({
  controllers: [],
  providers: [ApiAiTicketRepositoryDataAccess],
  exports: [],
})
export class ApiAiTicketRepositoryModule {}
