import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './api-ticket-api-controller.controller';
import { ApiTicketService } from '@grid-watch/api/ticket/service';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import {CommandBus,QueryBus} from '@nestjs/cqrs';

const ticketDtoMock: jest.Mocked<TicketDto> = new TicketDto() as TicketDto;

describe('TicketController', () => {
  let controller: TicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers:[ApiTicketService,CommandBus,QueryBus]
    }).compile();

    await module.init();

    controller = module.get<TicketController>(TicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
    //CreateTicket endpoint
    describe('CreateTicket',()=>{
      it('should return true ',async ()=>{
        jest
        .spyOn(controller,'createTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.createTicket(ticketDtoMock)).toEqual(
          true
        )
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'createTicket').mockResolvedValue(false);
    
        expect(await controller.createTicket(ticketDtoMock)).toEqual(false);
      });
    })

//getTicket endpoint
  describe('getTicket',()=>{
    it('should return a ticket',async ()=>{
      jest
      .spyOn(controller,'getTicket')
      .mockImplementation(():Promise<TicketDto> => Promise.resolve(ticketDtoMock));

      expect(await controller.getTicket('1')).toMatchObject(
        ticketDtoMock
      )
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'getTicket').mockResolvedValue(null);
  
      expect(await controller.getTicket("1")).toEqual(null);
    });
  })

  //getCity endpoint
  describe('getCity',()=>{
    const arrayOfTickets = [ticketDtoMock];
    it('should return tickes',async ()=>{
      jest
      .spyOn(controller,'getCity')
      .mockImplementation(():Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));

      expect(await controller.getCity('Hatfield')).toMatchObject(
        expect.arrayContaining(arrayOfTickets)
      )
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'getCity').mockResolvedValue(null);
  
      expect(await controller.getCity("City")).toEqual(null);
    });
  })

    //getStatus endpoint
    describe('getStatus',()=>{
      const arrayOfTickets = [ticketDtoMock];
      it('should return tickes',async ()=>{
        jest
        .spyOn(controller,'getStatus')
        .mockImplementation(():Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));
  
        expect(await controller.getStatus('status')).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'getStatus').mockResolvedValue(null);
    
        expect(await controller.getStatus("status")).toEqual(null);
      });
    })

    //getAll endpoint
    describe('getAll',()=>{
      const arrayOfTickets = [ticketDtoMock];
      it('should return all tickes',async ()=>{
        jest
        .spyOn(controller,'getAll')
        .mockImplementation(():Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));
  
        expect(await controller.getAll()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'getAll').mockResolvedValue(null);
    
        expect(await controller.getAll()).toEqual(null);
      });
    })

    //updateTicket endpoint
    describe('updateTicket',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicket(1,ticketDtoMock)).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicket').mockResolvedValue(false);
    
        expect(await controller.updateTicket(1,null)).toEqual(false);
      });
    })

    //updateTicketStatus endpoint
    describe('updateTicketStatus',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketStatus')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketStatus(1,JSON.parse('{"status":"Urgent"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketStatus').mockResolvedValue(false);
    
        expect(await controller.updateTicketStatus(1,null)).toEqual(false);
      });
    })

    //updateTicketCreateDate endpoint
    describe('updateTicketCreateDate',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketCreateDate')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketCreateDate(1,new Date)).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketCreateDate').mockResolvedValue(false);
    
        expect(await controller.updateTicketCreateDate(1,null)).toEqual(false);
      });
    })

    //updateTicketCloseDate endpoint
    describe('updateTicketCloseDate',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketCloseDate')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketCloseDate(1,new Date)).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketCloseDate').mockResolvedValue(false);
    
        expect(await controller.updateTicketCloseDate(1,null)).toEqual(false);
      });
    })

    //updateTicketType endpoint
    describe('updateTicketType',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketType')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketType(1,JSON.parse('{"type":"Pothole"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketType').mockResolvedValue(false);
    
        expect(await controller.updateTicketType(1,null)).toEqual(false);
      });
    })

    //updateTicketLocation endpoint
    describe('updateTicketLocation',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketLocation')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketLocation(1,JSON.parse('{"location":"Hatfield"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketLocation').mockResolvedValue(false);
    
        expect(await controller.updateTicketLocation(1,null)).toEqual(false);
      });
    })

    //updateTicketCost endpoint
    describe('updateTicketCost',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketCost')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketCost(1,JSON.parse('{"cost":123}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketCost').mockResolvedValue(false);
    
        expect(await controller.updateTicketCost(1,null)).toEqual(false);
      });
    })

    //updateTicketDescription endpoint
    describe('updateTicketDescription',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketDescription')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketDescription(1,JSON.parse('{"description":"Pothole near the university"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketDescription').mockResolvedValue(false);
    
        expect(await controller.updateTicketDescription(1,null)).toEqual(false);
      });
    })

    //updateTicketRepairTime endpoint
    describe('updateTicketRepairTime',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketRepairTime')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketRepairTime(1,JSON.parse('{"repairTime": 200}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketRepairTime').mockResolvedValue(false);
    
        expect(await controller.updateTicketRepairTime(1,null)).toEqual(false);
      });
    })

    //updateTicketUpvotes endpoint
    describe('updateTicketUpvotes',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'updateTicketUpvotes')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.updateTicketUpvotes(1,JSON.parse('{"upvotes": 20}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'updateTicketUpvotes').mockResolvedValue(false);
    
        expect(await controller.updateTicketUpvotes(1,null)).toEqual(false);
      });
    })

    //closeTicket endpoint
    describe('closeTicket',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'closeTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.closeTicket(JSON.parse('{"ticketNum": 2}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'closeTicket').mockResolvedValue(false);
    
        expect(await controller.closeTicket(null)).toEqual(false);
      });
    })

    //DeleteTicket endpoint
    describe('DeleteTicket',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'deleteTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.deleteTicket(JSON.parse('{"ticketNum": 2}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'deleteTicket').mockResolvedValue(false);
    
        expect(await controller.deleteTicket(null)).toEqual(false);
      });
    })
});
