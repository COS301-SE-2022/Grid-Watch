import { Test, TestingModule } from '@nestjs/testing';
import { ApiAiTicketApiController } from './api-ai-ticket-api.controller';
import {ApiAiTicketServiceService} from '@grid-watch/api/ai/ticket/service'
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('ApiAiTicketApiController', () => {
  let controller: ApiAiTicketApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiAiTicketApiController],
      providers:[ApiAiTicketServiceService,CommandBus,QueryBus]
    }).compile();

    await module.init();

    controller = module.get<ApiAiTicketApiController>(ApiAiTicketApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
