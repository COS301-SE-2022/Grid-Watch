import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiTicketService } from './api-ticket.service';
import { CreateTicketHandler, IncUpvotesHandler,CreatePictureHandler,DeleteTicketHandler, UpdateTicketHandler, UpdateTicketDescriptionHandler,UpdateTicketCloseDateHandler,UpdateTicketCostHandler,UpdateTicketCreateDateHandler,UpdateTicketLocationHandler,UpdateTicketRepairTimeHandler,UpdateTicketStatusHandler,UpdateTicketTypeHandler,UpdateTicketUpVotesHandler } from './commands/api-ticket-command-handler.handler';
import { GetTicketHandler, GetTicketsHandler, GetCityHandler,CloseTicketHandler,GetStatusHandler, GetTicketsDispatchedHandler, GetIssueHandler, GetTicketsSortByDateHandler, GetTicketsSortByIssueHandler, GetTicketsSortByCityHandler, GetTicketsSortByStatusHandler, GetTicketsSortByUpvotesHandler, GetPictureHandler } from './queries/api-ticket-quety-handler.handler';
import { ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';

@Module({
  imports: [CqrsModule],
  providers: [ApiTicketService,
    CreateTicketHandler,
    UpdateTicketHandler,
    CreatePictureHandler,
    IncUpvotesHandler,
    UpdateTicketDescriptionHandler,
    DeleteTicketHandler,
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
    UpdateTicketCloseDateHandler,
    UpdateTicketCostHandler,
    UpdateTicketCreateDateHandler,
    UpdateTicketLocationHandler,
    UpdateTicketRepairTimeHandler,
    UpdateTicketStatusHandler,
    UpdateTicketTypeHandler,
    UpdateTicketUpVotesHandler,
    GetPictureHandler,
  ],
  exports: [ApiTicketService],
})
export class ApiTicketServiceModule {}
