import { Test } from '@nestjs/testing';
import { ApiAiTicketServiceService } from './api-ai-ticket-service.service';

describe('ApiAiTicketServiceService', () => {
  let service: ApiAiTicketServiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiAiTicketServiceService],
    }).compile();

    service = module.get(ApiAiTicketServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
