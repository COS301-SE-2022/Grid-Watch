import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAiTicketServiceService } from './api-ai-ticket-service.service';

@Module({
  controllers: [],
  imports: [CqrsModule],
  providers: [ApiAiTicketServiceService],
  exports: [ApiAiTicketServiceService],
})
export class ApiAiTicketServiceModule {}
