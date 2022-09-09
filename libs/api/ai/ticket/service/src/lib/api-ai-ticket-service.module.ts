import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAiTicketServiceService } from './api-ai-ticket-service.service';
import {GetIssueAIHandler,GetTechTeamSpecialisationHandler,GetAllTicketsHandler} from './queries/api-ai-ticket-query-handler.handler';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {ApiProfilesTechTeamRepositoryDataAccess} from '@grid-watch/api/profiles/tech-team/repository';
import { DivNode } from './ai/div-node';
import { GP } from './ai/gp'; 
import { InternalNode } from './ai/internal-node';
import { LeafNode } from './ai/leaf-node';
import { MinNode } from './ai/min-node';
import { multNode } from './ai/mult-node';
import { Node } from './ai/node';
import { PlusNode } from './ai/plus-node';
import { Tree } from './ai/tree';
@Module({
  controllers: [],
  imports: [CqrsModule],
  providers: [ApiAiTicketServiceService,
              Number,
              Array,
              ApiTicketRepositoryDataAccess,
              ApiProfilesTechTeamRepositoryDataAccess,
              GetIssueAIHandler,
              GetTechTeamSpecialisationHandler,
              GetAllTicketsHandler,
              DivNode,
              GP,
              InternalNode,
              LeafNode,
              MinNode,
              multNode,
              Node,
              Number,
              Array,
              PlusNode,
              Tree,
              Number,
              Array
            ],
  exports: [ApiAiTicketServiceService],
})
export class ApiAiTicketServiceModule {}
