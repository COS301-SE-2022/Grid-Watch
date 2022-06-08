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
    //   expect(await provider.createTicket("urgent", createDate, closeDate, "pothole", "Hatfield", "Location", 500, "description", 200, 20)).toBeUndefined()
    // });

    it('should return null', async () => {
      jest.spyOn(provider, 'createTicket').mockResolvedValue(null);
      const createDate = new Date();
      const closeDate = new Date();
      expect(await provider.createTicket("urgent", createDate, closeDate, "pothole", "Hatfield", "Location", 500, "description", 200, 20)).toEqual(null);
    });
  })

  //UpdateTicket
  describe('UpdateTicket',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'UpdateTicket')
      .mockImplementation(():Promise<void> => Promise.resolve());

      const createDate = new Date();
      const closeDate = new Date();
      expect(await provider.UpdateTicket(1,"urgent", createDate, closeDate, "pothole", "Hatfield", "Location", 500, "description", 200, 20)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'UpdateTicket').mockResolvedValue(null);
      const createDate = new Date();
      const closeDate = new Date();
      expect(await provider.UpdateTicket(1,"urgent", createDate, closeDate, "pothole", "Hatfield", "Location", 500, "description", 200, 20)).toEqual(null);
    });
  })

    //UpdateStatus
    describe('UpdateStatus',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateStatus')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.UpdateStatus(2,"urgent")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateStatus').mockResolvedValue(null);

        expect(await provider.UpdateStatus(2,"urgent")).toEqual(null);
      });
    })

    //UpdateCreateDate
    describe('UpdateCreateDate',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateCreateDate')
        .mockImplementation(():Promise<void> => Promise.resolve());
        const createDate = new Date();
        expect(await provider.UpdateCreateDate(3,createDate)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateCreateDate').mockResolvedValue(null);
        const createDate = new Date();
        expect(await provider.UpdateCreateDate(3,createDate)).toEqual(null);
      });
    })

    //UpdateCloseDate
    describe('UpdateCloseDate',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateCloseDate')
        .mockImplementation(():Promise<void> => Promise.resolve());
        const closeDate = new Date();
        expect(await provider.UpdateCloseDate(3,closeDate)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateCloseDate').mockResolvedValue(null);
        const closeDate = new Date();
        expect(await provider.UpdateCloseDate(3,closeDate)).toEqual(null);
      });
    })

    //UpdateType
    describe('UpdateType',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateType')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateType(3,"Pothole")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateType').mockResolvedValue(null);
        expect(await provider.UpdateType(3,"Pothole")).toEqual(null);
      });
    })

    //UpdateLocation
    describe('UpdateLocation',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateLocation')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateLocation(3,"21 Duxbury Rd, Hatfield")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateLocation').mockResolvedValue(null);
        expect(await provider.UpdateLocation(3,"21 Duxbury Rd, Hatfield")).toEqual(null);
      });
    })

    //UpdateCost
    describe('UpdateCost',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateCost')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateCost(1,50000.00)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateCost').mockResolvedValue(null);
        expect(await provider.UpdateCost(1,50000.00)).toEqual(null);
      });
    })

    //UpdateDescription
    describe('UpdateDescription',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateDescription')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateDescription(1,"There is a large pothole.")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateDescription').mockResolvedValue(null);
        expect(await provider.UpdateDescription(1,"There is a large pothole.")).toEqual(null);
      });
    })

    //UpdateRepairTime
    describe('UpdateRepairTime',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateRepairTime')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateRepairTime(1,20000)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateRepairTime').mockResolvedValue(null);
        expect(await provider.UpdateRepairTime(1,20000)).toEqual(null);
      });
    })

    //UpdateUpvotes
    describe('UpdateUpvotes',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateUpvotes')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateUpvotes(1,20)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateUpvotes').mockResolvedValue(null);
        expect(await provider.UpdateUpvotes(1,20)).toEqual(null);
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
    const arrayOfTickets = [ticketDtoMock];
    it('should return all tickets',async ()=>{
      jest
      .spyOn(provider,'getAllTickets')
      .mockImplementation(():Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));
    
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
      .spyOn(provider,'getTicket')
      .mockImplementation(():Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));
    
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
      .spyOn(provider,'getCityTicket')
      .mockImplementation(():Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));
    
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
      .spyOn(provider,'getStatus')
      .mockImplementation(():Promise<TicketDto[]> => Promise.resolve(arrayOfTickets));
    
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
