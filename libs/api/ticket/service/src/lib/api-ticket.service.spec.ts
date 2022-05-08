import { Test, TestingModule } from '@nestjs/testing';
import { ApiTicketService } from './api-ticket.service';
import {CommandBus,QueryBus} from '@nestjs/cqrs';

describe('ApiTicketService', () => {
  let service: ApiTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiTicketService],
    }).compile();

    service = module.get<ApiTicketService>(ApiTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
