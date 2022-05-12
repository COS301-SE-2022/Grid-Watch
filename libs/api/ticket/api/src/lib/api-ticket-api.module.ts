import { Module } from '@nestjs/common';
import { TicketController } from './controllers/api-ticket-api-controller.controller';
import { ApiTicketServiceModule } from '@grid-watch/api/ticket/service';

@Module({
  controllers: [TicketController],
  imports:[ApiTicketServiceModule],
  providers: [],
  exports: [],
})
export class ApiTicketApiModule {}
