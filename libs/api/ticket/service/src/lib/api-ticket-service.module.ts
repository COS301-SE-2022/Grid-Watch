import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { ApiTicketService } from './api-ticket.service';
import { createTicketHandler, deleteTicketHandler, updateTicketHandler } from './commands/api-ticket-command-handler.handler';
import { GetTicketHandler, GetTicketsHandler } from './queries/api-ticket-quety-handler.handler';
import { ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';

@Module({
  imports: [CqrsModule],
  providers: [ApiTicketService,
    createTicketHandler,
    updateTicketHandler,
    deleteTicketHandler,
    GetTicketHandler,
    GetTicketsHandler,
    ApiTicketRepositoryDataAccess,
    CommandBus
  ],
  exports: [ApiTicketService],
})
export class ApiTicketServiceModule {}
