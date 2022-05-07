import { Module } from '@nestjs/common';
import { ApiTicketService } from '../../../../service/src/lib/api-ticket.service';
import { TicketController } from './api-ticket-api-controller.controller';

@Module({
  controllers: [TicketController],
  providers: [ApiTicketService],
  exports: [],
})
export class ApiTicketApiModule {}
