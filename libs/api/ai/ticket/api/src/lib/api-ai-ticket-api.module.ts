import { Module } from '@nestjs/common';
import { ApiAiTicketApiController } from './api-ai-ticket-api.controller';
import {ApiAiTicketServiceModule} from '@grid-watch/api/ai/ticket/service';

@Module({
  controllers: [ApiAiTicketApiController],
  imports: [ApiAiTicketServiceModule],
  providers: [],
  exports: [],
})
export class ApiAiTicketApiModule {}
