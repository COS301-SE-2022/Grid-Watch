import { Module } from '@nestjs/common';
import { ApiAiTicketApiController } from './api-ai-ticket-api.controller';

@Module({
  controllers: [ApiAiTicketApiController],
  providers: [],
  exports: [],
})
export class ApiAiTicketApiModule {}
