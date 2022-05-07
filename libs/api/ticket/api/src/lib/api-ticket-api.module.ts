import { Module } from '@nestjs/common';
import { TicketController } from './api-ticket-api-controller.controller';

@Module({
  controllers: [TicketController],
  providers: [],
  exports: [],
})
export class ApiTicketApiModule {}
