import { Test } from '@nestjs/testing';
import { ApiAiTicketApiController } from './api-ai-ticket-api.controller';

describe('ApiAiTicketApiController', () => {
  let controller: ApiAiTicketApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAiTicketApiController],
    }).compile();

    controller = module.get(ApiAiTicketApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
