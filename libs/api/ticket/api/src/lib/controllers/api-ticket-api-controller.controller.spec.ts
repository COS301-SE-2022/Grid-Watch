import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './api-ticket-api-controller.controller';
import { ApiTicketService } from '@grid-watch/api/ticket/service';
import {CommandBus,QueryBus} from '@nestjs/cqrs';

describe('TicketController', () => {
  let controller: TicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers:[ApiTicketService,CommandBus,QueryBus]
    }).compile();

    controller = module.get<TicketController>(TicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
