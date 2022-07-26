import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiTicketService } from './api-ticket.service';
import { CreateSubtaskHandler,DeletePictureHanadler,DeleteSubtaskHandler,UpdatePictureHandler,UpdateStreetAddressHandler,UpdateSubtaskDescHandler,UpdateSubtaskHandler,UpdateSubtaskStatusHandler,UpdateSubtaskStepHandler,UpdateSubtaskTicketHandler,UpdateLongitudeHandler,UpdateLatitudeHandler,CreateTicketHandler, IncUpvotesHandler,CreatePictureHandler,DeleteTicketHandler, UpdateTicketHandler, UpdateTicketDescriptionHandler,UpdateTicketCloseDateHandler,UpdateTicketCostHandler,UpdateTicketCreateDateHandler,UpdateTicketLocationHandler,UpdateTicketRepairTimeHandler,UpdateTicketStatusHandler,UpdateTicketTypeHandler,UpdateTicketUpVotesHandler, updateAssignedTechTeamHandler } from './commands/api-ticket-command-handler.handler';
import { GetTicketHandler, GetTicketsHandler, GetCityHandler,CloseTicketHandler,GetStatusHandler, GetTicketsDispatchedHandler, GetIssueHandler, GetTicketsSortByDateHandler, GetTicketsSortByIssueHandler, GetTicketsSortByCityHandler, GetTicketsSortByStatusHandler, GetTicketsSortByUpvotesHandler, GetPictureHandler } from './queries/api-ticket-quety-handler.handler';
import { ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import { updateAssignedTechTeamCommand } from './commands/api-ticket-command.command';

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
    updateAssignedTechTeamHandler,
    GetPictureHandler,
    CreateSubtaskHandler,
    DeletePictureHanadler,
    DeleteSubtaskHandler,
    UpdatePictureHandler,
    UpdateStreetAddressHandler,
    UpdateSubtaskDescHandler,
    UpdateSubtaskHandler,
    UpdateSubtaskStatusHandler,
    UpdateSubtaskStepHandler,
    UpdateSubtaskTicketHandler,
    UpdateLongitudeHandler,
    UpdateLatitudeHandler,
  ],
  exports: [ApiTicketService],
})
export class ApiTicketServiceModule {}
