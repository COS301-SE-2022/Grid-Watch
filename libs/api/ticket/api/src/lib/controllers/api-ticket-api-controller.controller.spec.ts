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

    //CreateTicket endpoint
    describe('CreateTicket',()=>{
      it('should return true ',async ()=>{
        jest
        .spyOn(controller,'CreateTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.CreateTicket(ticketDtoMock)).toEqual(
          true
        )
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'CreateTicket').mockResolvedValue(false);
    
        expect(await controller.CreateTicket(ticketDtoMock)).toEqual(false);
      });
    })

    //UpdateTicket endpoint
    describe('UpdateTicket',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicket(1,ticketDtoMock)).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicket').mockResolvedValue(false);
    
        expect(await controller.UpdateTicket(1,null)).toEqual(false);
      });
    })

    //UpdateTicketStatus endpoint
    describe('UpdateTicketStatus',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketStatus')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketStatus(1,JSON.parse('{"status":"Urgent"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketStatus').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketStatus(1,null)).toEqual(false);
      });
    })

    //UpdateTicketCreateDate endpoint
    describe('UpdateTicketCreateDate',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketCreateDate')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketCreateDate(1,new Date)).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketCreateDate').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketCreateDate(1,null)).toEqual(false);
      });
    })

    //UpdateTicketCloseDate endpoint
    describe('UpdateTicketCloseDate',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketCloseDate')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketCloseDate(1,new Date)).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketCloseDate').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketCloseDate(1,null)).toEqual(false);
      });
    })

    //UpdateTicketType endpoint
    describe('UpdateTicketType',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketType')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketType(1,JSON.parse('{"type":"Pothole"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketType').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketType(1,null)).toEqual(false);
      });
    })

    //UpdateTicketLocation endpoint
    describe('UpdateTicketLocation',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketLocation')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketLocation(1,JSON.parse('{"location":"Hatfield"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketLocation').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketLocation(1,null)).toEqual(false);
      });
    })

    //UpdateTicketCost endpoint
    describe('UpdateTicketCost',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketCost')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketCost(1,JSON.parse('{"cost":123}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketCost').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketCost(1,null)).toEqual(false);
      });
    })

    //UpdateTicketDescription endpoint
    describe('UpdateTicketDescription',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketDescription')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketDescription(1,JSON.parse('{"description":"Pothole near the university"}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketDescription').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketDescription(1,null)).toEqual(false);
      });
    })

    //UpdateTicketRepairTime endpoint
    describe('UpdateTicketRepairTime',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketRepairTime')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketRepairTime(1,JSON.parse('{"repairTime": 200}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketRepairTime').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketRepairTime(1,null)).toEqual(false);
      });
    })

    //UpdateTicketUpvotes endpoint
    describe('UpdateTicketUpvotes',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'UpdateTicketUpvotes')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.UpdateTicketUpvotes(1,JSON.parse('{"upvotes": 20}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'UpdateTicketUpvotes').mockResolvedValue(false);
    
        expect(await controller.UpdateTicketUpvotes(1,null)).toEqual(false);
      });
    })

    //CloseTicket endpoint
    describe('CloseTicket',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'CloseTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.CloseTicket(JSON.parse('{"ticketNum": 2}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'CloseTicket').mockResolvedValue(false);
    
        expect(await controller.CloseTicket(null)).toEqual(false);
      });
    })

    //DeleteTicket endpoint
    describe('DeleteTicket',()=>{
      it('should return true',async ()=>{
        jest
        .spyOn(controller,'DeleteTicket')
        .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  
        expect(await controller.DeleteTicket(JSON.parse('{"ticketNum": 2}'))).toEqual(true);
      });
  
      it('should return false', async () => {
        jest.spyOn(controller, 'DeleteTicket').mockResolvedValue(false);
    
        expect(await controller.DeleteTicket(null)).toEqual(false);
      });
    })
});
