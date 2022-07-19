import { Module } from '@nestjs/common';
import { ApiAiTicketServiceService } from './api-ai-ticket-service.service';

@Module({
  controllers: [],
  providers: [ApiAiTicketServiceService],
  exports: [ApiAiTicketServiceService],
})
export class ApiAiTicketServiceModule {}
