import { Module } from '@nestjs/common';
import { ApiTicketService } from './api-ticket.service';

@Module({
  controllers: [],
  providers: [ApiTicketService],
  exports: [ApiTicketService],
})
export class ApiTicketServiceModule {}
