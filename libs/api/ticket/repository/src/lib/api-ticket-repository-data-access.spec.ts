import { Test, TestingModule } from '@nestjs/testing';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { ApiTicketRepositoryDataAccess } from './api-ticket-repository-data-access';
import { Ticket } from '@prisma/client';

  const ticketDtoMock: jest.Mocked<TicketDto> = new TicketDto() as TicketDto;

  describe('ApiTicketRepositoryDataAccess', () => {
  let provider: ApiTicketRepositoryDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiTicketRepositoryDataAccess],
    }).compile();

    provider = module.get<ApiTicketRepositoryDataAccess>(
      ApiTicketRepositoryDataAccess
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  //createTicket endpoint
  describe('createTicket',()=>{
    // it('should return void',async ()=>{
    //   jest
    //   .spyOn(provider,'createTicket')
    //   .mockImplementation(():Promise<void> => Promise.resolve());

    //   const createDate = new Date();
    //   const closeDate = new Date();
    //   expect(await provider.createTicket("urgent", createDate, closeDate, "pothole", "Hatfield", "Location", 500, "description", 200, 20)).toBeundefined()
    // });

    it('should return null', async () => {
      jest.spyOn(provider, 'createTicket').mockResolvedValue(null);
      const createDate = new Date();
      const closeDate = new Date();
      expect(await provider.createTicket(ticketDtoMock)).toEqual(null);
    });
  })

  //updateTicket
  describe('updateTicket',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTicket')
      .mockImplementation(():Promise<void> => Promise.resolve());

      const createDate = new Date();
      const closeDate = new Date();
      expect(await provider.updateTicket(1,ticketDtoMock)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTicket').mockResolvedValue(null);
      const createDate = new Date();
      const closeDate = new Date();
      expect(await provider.updateTicket(1,ticketDtoMock)).toEqual(null);
    });
  })

    //updateStatus
    describe('updateStatus',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateStatus')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.updateStatus(2,"urgent")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateStatus').mockResolvedValue(null);

        expect(await provider.updateStatus(2,"urgent")).toEqual(null);
      });
    })

    //updateCreateDate
    describe('updateCreateDate',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateCreateDate')
        .mockImplementation(():Promise<void> => Promise.resolve());
        const createDate = new Date();
        expect(await provider.updateCreateDate(3,createDate)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateCreateDate').mockResolvedValue(null);
        const createDate = new Date();
        expect(await provider.updateCreateDate(3,createDate)).toEqual(null);
      });
    })

    //updateCloseDate
    describe('updateCloseDate',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateCloseDate')
        .mockImplementation(():Promise<void> => Promise.resolve());
        const closeDate = new Date();
        expect(await provider.updateCloseDate(3,closeDate)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateCloseDate').mockResolvedValue(null);
        const closeDate = new Date();
        expect(await provider.updateCloseDate(3,closeDate)).toEqual(null);
      });
    })

    //updateType
    describe('updateType',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateType')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateType(3,"Pothole")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateType').mockResolvedValue(null);
        expect(await provider.updateType(3,"Pothole")).toEqual(null);
      });
    })

    //updateLocation
    describe('updateLocation',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateLocation')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateLocation(3,"21 Duxbury Rd, Hatfield")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateLocation').mockResolvedValue(null);
        expect(await provider.updateLocation(3,"21 Duxbury Rd, Hatfield")).toEqual(null);
      });
    })

    //updateCost
    describe('updateCost',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateCost')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateCost(1,50000.00)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateCost').mockResolvedValue(null);
        expect(await provider.updateCost(1,50000.00)).toEqual(null);
      });
    })

    //updateDescription
    describe('updateDescription',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateDescription')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateDescription(1,"There is a large pothole.")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateDescription').mockResolvedValue(null);
        expect(await provider.updateDescription(1,"There is a large pothole.")).toEqual(null);
      });
    })

    //updateRepairTime
    describe('updateRepairTime',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateRepairTime')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateRepairTime(1,20000)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateRepairTime').mockResolvedValue(null);
        expect(await provider.updateRepairTime(1,20000)).toEqual(null);
      });
    })

    //updateupvotes
    describe('updateUpvotes',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateUpvotes')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateUpvotes(1,20)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateUpvotes').mockResolvedValue(null);
        expect(await provider.updateUpvotes(1,20)).toEqual(null);
      });
    })

    //closeTicket
    describe('closeTicket',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'closeTicket')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.closeTicket(2)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'closeTicket').mockResolvedValue(null);

        expect(await provider.closeTicket(2)).toEqual(null);
      });
    })

    //deleteTicket
    describe('deleteTicket',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'deleteTicket')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.deleteTicket(2)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'deleteTicket').mockResolvedValue(null);

        expect(await provider.deleteTicket(2)).toEqual(null);
      });
    })

  //getAllTickets endpoint
    describe('getAllTickets',()=>{
    const arrayOfTickets = [TicketDto];
    it('should return all tickets',async ()=>{
      jest
      .spyOn(provider,'getAllTickets');
    
      expect(await provider.getAllTickets()).toMatchObject(
        expect.arrayContaining(arrayOfTickets)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(provider, 'getAllTickets').mockResolvedValue(null);
      
      expect(await provider.getAllTickets()).toEqual(null);
    });
  })

    //getTicket endpoint
    describe('getTicket',()=>{
    const arrayOfTickets = [ticketDtoMock];
    it('should return a ticket',async ()=>{
      jest
      .spyOn(provider,'getTicket');
    
      expect(await provider.getTicket(2)).toMatchObject(
        expect.arrayContaining(arrayOfTickets)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(provider, 'getTicket').mockResolvedValue(null);
      
      expect(await provider.getTicket(2)).toEqual(null);
    });
  })

    //getCityTicket endpoint
    describe('getCityTicket',()=>{
    const arrayOfTickets = [ticketDtoMock];
    it('should return tickets',async ()=>{
      jest
      .spyOn(provider,'getCityTicket');
    
      expect(await provider.getCityTicket("Pretoria")).toMatchObject(
        expect.arrayContaining(arrayOfTickets)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(provider, 'getCityTicket').mockResolvedValue(null);
      
      expect(await provider.getCityTicket("Pretoria")).toEqual(null);
    });
  })

    //getStatus endpoint
    describe('getStatus',()=>{
    const arrayOfTickets = [ticketDtoMock];
    it('should return tickets',async ()=>{
      jest
      .spyOn(provider,'getStatus');
    
      expect(await provider.getStatus("In progress")).toMatchObject(
        expect.arrayContaining(arrayOfTickets)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(provider, 'getStatus').mockResolvedValue(null);
      
      expect(await provider.getStatus("In progress")).toEqual(null);
    });
  })

});
