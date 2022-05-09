import { Module } from '@nestjs/common';
import { TicketController } from './controllers/api-ticket-api-controller.controller';

@Module({
  controllers: [TicketController],
  providers: [],
  exports: [],
})
export class ApiTicketApiModule {}
