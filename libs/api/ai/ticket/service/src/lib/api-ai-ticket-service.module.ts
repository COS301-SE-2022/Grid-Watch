import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAiTicketServiceService } from './api-ai-ticket-service.service';
import {GetIssueAIHandler,GetAllAIHandler,GetTechTeamSpecialisationHandler,GetAllTicketsHandler,ReadAIHandler} from './queries/api-ai-ticket-query-handler.handler';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {DeleteAIHandler,SaveAIHandler,UpdateAIDataHandler,UpdateAIDateCreatedHandler,UpdateAIFitnessHandler,UpdateAIHandler,UpdateAITicketCitiesHandler,UpdateAITicketTypesHandler} from './commands/api-ai-ticket-handler.handler';
import {ApiProfilesTechTeamRepositoryDataAccess} from '@grid-watch/api/profiles/tech-team/repository';
import {ApiAiTicketRepositoryDataAccess} from '@grid-watch/api/ai/ticket/repository';
import { DivNode } from './ai/div-node';
import { GP } from './ai/gp'; 
import { InternalNode } from './ai/internal-node';
import { LeafNode } from './ai/leaf-node';
import { MinNode } from './ai/min-node';
import { multNode } from './ai/mult-node';
import { Node } from './ai/node';
import { PlusNode } from './ai/plus-node';
import { Tree } from './ai/tree';
import {BestSplit} from './decision_tree/best-split';
import {DecisionTree} from './decision_tree/decision-tree';
import {Node as NodeDT} from './decision_tree/node';

@Module({
  controllers: [],
  imports: [CqrsModule,Number,Array],
  providers: [ApiAiTicketServiceService,
              ApiAiTicketRepositoryDataAccess,
              ReadAIHandler,
              BestSplit,
              DecisionTree,
              Number,
              Array,
              GetAllAIHandler,
              ApiTicketRepositoryDataAccess,
              ApiProfilesTechTeamRepositoryDataAccess,
              GetIssueAIHandler,
              GetTechTeamSpecialisationHandler,
              DeleteAIHandler,
              SaveAIHandler,
              UpdateAIDataHandler,
              UpdateAIDateCreatedHandler,
              UpdateAIFitnessHandler,
              UpdateAIHandler,
              UpdateAITicketCitiesHandler,
              UpdateAITicketTypesHandler,
              GetAllTicketsHandler,
              Array,
              Number,
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
