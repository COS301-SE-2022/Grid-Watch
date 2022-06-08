import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiTicketService } from './api-ticket.service';
import { createTicketHandler, IncUpvotesHandler,deleteTicketHandler, updateTicketHandler, updateTicketDescriptionHandler,updateTicketCloseDateHandler,updateTicketCostHandler,updateTicketCreateDateHandler,updateTicketLocationHandler,updateTicketRepairTimeHandler,updateTicketStatusHandler,updateTicketTypeHandler,updateTicketUpVotesHandler } from './commands/api-ticket-command-handler.handler';
import { GetTicketHandler, GetTicketsHandler, GetCityHandler,CloseTicketHandler,GetStatusHandler, GetTicketsDispatchedHandler, GetIssueHandler, GetTicketsSortByDateHandler, GetTicketsSortByIssueHandler, GetTicketsSortByCityHandler, GetTicketsSortByStatusHandler, GetTicketsSortByUpvotesHandler } from './queries/api-ticket-quety-handler.handler';
import { ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';

@Module({
  imports: [CqrsModule],
  providers: [ApiTicketService,
    createTicketHandler,
    updateTicketHandler,
    IncUpvotesHandler,
    updateTicketDescriptionHandler,
    deleteTicketHandler,
    GetTicketHandler,
    GetTicketsHandler,
    GetTicketsDispatchedHandler,
    GetCityHandler,
    GetIssueHandler,
    GetTicketsSortByDateHandler,
    GetTicketsSortByIssueHandler,
    GetTicketsSortByCityHandler,
    GetTicketsSortByStatusHandler,
    GetTicketsSortByUpvotesHandler,
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
