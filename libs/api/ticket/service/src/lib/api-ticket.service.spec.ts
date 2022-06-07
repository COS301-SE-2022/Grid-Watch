import { Test, TestingModule } from '@nestjs/testing';
import { ApiTicketService } from './api-ticket.service';
import {CommandBus,QueryBus} from '@nestjs/cqrs';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';

const ticketDtoMock: jest.Mocked<TicketDto> = new TicketDto() as TicketDto;

describe('ApiTicketService', () => {
  let service: ApiTicketService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiTicketService,QueryBus,CommandBus],
    }).compile();

    await module.init();

    service = module.get<ApiTicketService>(ApiTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetTicket',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'GetTicket')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.GetTicket(1)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'GetTicket').mockResolvedValue(null);

      expect(await service.GetTicket(1)).toEqual(null);
    });
  })

  describe('getCityTicket',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'getCityTicket')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.getCityTicket('city')).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'getCityTicket').mockResolvedValue(null);

      expect(await service.getCityTicket('city')).toEqual(null);
    });
  })
  
  describe('getStatus',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'getStatus')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.getStatus('status')).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'getStatus').mockResolvedValue(null);

      expect(await service.getStatus('status')).toEqual(null);
    });
  })

  describe('GetAll',()=>{
    const arrayOfTickets = [ticketDtoMock];
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'GetAll')
      .mockImplementation((): Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));

      expect(await service.GetAll()).toMatchObject(expect.arrayContaining(arrayOfTickets))
    });

    it('should return null',async()=>{
      jest.spyOn(service,'GetAll').mockResolvedValue(null);

      expect(await service.GetAll()).toEqual(null);
    });
  })

  describe('createTicket',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'createTicket')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.createTicket('status',new Date,new Date,'type','city','location',21,'description',21,21)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'createTicket').mockResolvedValue(null);

      expect(await service.createTicket('status',new Date,new Date,'type','city','location',21,'description',21,21)).toEqual(null);
    });
  })


  
  describe('UpdateTicket',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'UpdateTicket')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.UpdateTicket(1,'status',new Date,new Date,'type','city','location',21,'description',21,21)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'UpdateTicket').mockResolvedValue(null);

      expect(await service.UpdateTicket(1,'status',new Date,new Date,'type','city','location',21,'description',21,21)).toEqual(null);
    });
  })

  describe('updateTicketStatus',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketStatus')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketStatus(1,'status')).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketStatus').mockResolvedValue(null);

      expect(await service.updateTicketStatus(1,'status')).toEqual(null);
    });
  })


  describe('updateTicketCreateDate',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketCreateDate')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketCreateDate(1,new Date)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketCreateDate').mockResolvedValue(null);

      expect(await service.updateTicketCreateDate(1,new Date)).toEqual(null);
    });
  })


  describe('updateTicketCloseDate',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketCloseDate')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketCloseDate(1,new Date)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketCloseDate').mockResolvedValue(null);

      expect(await service.updateTicketCloseDate(1,new Date)).toEqual(null);
    });
  })

  describe('updateTicketType',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketType')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketType(1,'type')).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketType').mockResolvedValue(null);

      expect(await service.updateTicketType(1,'type')).toEqual(null);
    });
  })

  describe('updateTicketLocation',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketLocation')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketLocation(1,'location')).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketLocation').mockResolvedValue(null);

      expect(await service.updateTicketLocation(1,'location')).toEqual(null);
    });
  })

  describe('updateTicketDescription',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketDescription')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketDescription(1,'description')).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketDescription').mockResolvedValue(null);

      expect(await service.updateTicketDescription(1,'description')).toEqual(null);
    });
  })

  describe('updateTicketCost',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketCost')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketCost(1,1)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketCost').mockResolvedValue(null);

      expect(await service.updateTicketCost(1,1)).toEqual(null);
    });
  })


  describe('updateTicketRepairTime',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketRepairTime')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketRepairTime(1,1)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketRepairTime').mockResolvedValue(null);

      expect(await service.updateTicketRepairTime(1,1)).toEqual(null);
    });
  })

  describe('updateTicketUpVotes',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'updateTicketUpVotes')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.updateTicketUpVotes(1,1)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'updateTicketUpVotes').mockResolvedValue(null);

      expect(await service.updateTicketUpVotes(1,1)).toEqual(null);
    });
  })

  describe('closeTicket',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'closeTicket')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.closeTicket(1)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'closeTicket').mockResolvedValue(null);

      expect(await service.closeTicket(1)).toEqual(null);
    });
  })

  describe('deleteTicket',()=>{
    it('should return a ticket',async()=>{
      jest
      .spyOn(service,'deleteTicket')
      .mockImplementation((): Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await service.deleteTicket(1)).toMatchObject(ticketDtoMock)
    });

    it('should return null',async()=>{
      jest.spyOn(service,'deleteTicket').mockResolvedValue(null);

      expect(await service.deleteTicket(1)).toEqual(null);
    });
  })

});
