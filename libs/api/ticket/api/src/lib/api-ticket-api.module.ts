import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';

@Module({
  controllers: [TicketController],
  providers: [],
  exports: [],
})
export class ApiTicketApiModule {}
