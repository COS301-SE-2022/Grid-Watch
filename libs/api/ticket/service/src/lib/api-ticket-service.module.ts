import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiTicketService } from './api-ticket.service';
import { createTicketHandler, deleteTicketHandler, updateTicketHandler, updateTicketDescriptionHandler,updateTicketCloseDateHandler,updateTicketCostHandler,updateTicketCreateDateHandler,updateTicketLocationHandler,updateTicketRepairTimeHandler,updateTicketStatusHandler,updateTicketTypeHandler,updateTicketUpVotesHandler } from './commands/api-ticket-command-handler.handler';
import { GetTicketHandler, GetTicketsHandler, GetCityHandler,CloseTicketHandler,GetStatusHandler } from './queries/api-ticket-quety-handler.handler';
import { ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';

@Module({
  imports: [CqrsModule],
  providers: [ApiTicketService,
    createTicketHandler,
    updateTicketHandler,
    updateTicketDescriptionHandler,
    deleteTicketHandler,
    GetTicketHandler,
    GetTicketsHandler,
    GetCityHandler,
    ApiTicketRepositoryDataAccess,
    CloseTicketHandler,
    GetStatusHandler,
    updateTicketCloseDateHandler,
    updateTicketCostHandler,
    updateTicketCreateDateHandler,
    updateTicketLocationHandler,
    updateTicketRepairTimeHandler,
    updateTicketStatusHandler,
    updateTicketTypeHandler,
    updateTicketUpVotesHandler
  ],
  exports: [ApiTicketService],
})
export class ApiTicketServiceModule {}
