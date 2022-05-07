import { Module } from '@nestjs/common';
import { ApiTicketRepositoryDataAccess } from './api-ticket-repository-data-access';

@Module({
  controllers: [],
  providers: [ApiTicketRepositoryDataAccess],
  exports: [],
})
export class ApiTicketRepositoryModule {}
