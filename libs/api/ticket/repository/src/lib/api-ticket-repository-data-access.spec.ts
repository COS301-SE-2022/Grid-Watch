import { Test, TestingModule } from '@nestjs/testing';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { ApiTicketRepositoryDataAccess } from './api-ticket-repository-data-access';
import { Picture, Subtasks } from '@prisma/client';

  const ticketDtoMock: jest.Mocked<TicketDto> = new TicketDto() as TicketDto;

   ticketDtoMock.ticketStatus = "Dispatched";
   // ticketDtoMock.ticketCreateDate = "2022/07/11";
   // ticketDtoMock.ticketCloseDate =  "2022/07/11";  
   ticketDtoMock.ticketType =  "Pothole";        
   ticketDtoMock.ticketCity =  "Pretoria";            
   ticketDtoMock.ticketLocation = "21 Duxbury Rd, Hatfield";      
   ticketDtoMock.ticketCost = 25000;           
   ticketDtoMock.ticketDescription = "There is a large pothole in the middle of the road";    
   ticketDtoMock.ticketRepairTime =  55600;    
   ticketDtoMock.ticketUpvotes = 52;       
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
     it('should return ticket',async ()=>{
       jest
       .spyOn(provider,'createTicket')
       .mockImplementation(():Promise<TicketDto> => Promise.resolve(ticketDtoMock))
       expect(await provider.createTicket(ticketDtoMock)).toEqual(ticketDtoMock);
     });

    it('should return null', async () => {
      jest.spyOn(provider, 'createTicket').mockResolvedValue(null);
      expect(await provider.createTicket(ticketDtoMock)).toEqual(null);
    });
  })

  //getAllTickets endpoint
  describe('getAllTickets',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return all tickets',async ()=>{
        jest
        .spyOn(provider,'getAllTickets')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getAllTickets()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getAllTickets').mockResolvedValue(null);
        
        expect(await provider.getAllTickets()).toEqual(null);
      });
})

  //getAllTicketsDispatched endpoint
  describe('getAllTicketsDispatched',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return a ticket',async ()=>{
        jest
        .spyOn(provider,'getAllTicketsDispatched')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getAllTicketsDispatched()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getAllTicketsDispatched').mockResolvedValue(null);
        expect(await provider.getAllTicketsDispatched()).toEqual(null);
      });
  })

  //getAssignedTechteam endpoint
  describe('getAssignedTechteam',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return a ticket',async ()=>{
        jest
        .spyOn(provider,'getAssignedTechteam')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getAssignedTechteam(2)).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getAssignedTechteam').mockResolvedValue(null);
        expect(await provider.getAssignedTechteam(2)).toEqual(null);
      });
  })

  //getTicket endpoint
  describe('getTicket',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return a ticket',async ()=>{
        jest
        .spyOn(provider,'getTicket')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
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
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getCityTicket')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getCityTicket(ticketDtoMock.ticketCity)).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getCityTicket').mockResolvedValue(null);
        expect(await provider.getCityTicket(ticketDtoMock.ticketCity)).toEqual(null);
      });
  })

  //getStatus endpoint
  describe('getStatus',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getStatus')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getStatus(ticketDtoMock.ticketStatus)).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getStatus').mockResolvedValue(null);
        expect(await provider.getStatus(ticketDtoMock.ticketStatus)).toEqual(null);
      });
  })

  //getIssue endpoint
  describe('getIssue',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getIssue')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getIssue(ticketDtoMock.ticketType)).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getIssue').mockResolvedValue(null);
        expect(await provider.getIssue(ticketDtoMock.ticketType)).toEqual(null);
      });
  })

  //getTicketsSortDate endpoint
  describe('getTicketsSortDate',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortDate')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortDate()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortDate').mockResolvedValue(null);
        expect(await provider.getTicketsSortDate()).toEqual(null);
      });
  })

  //getTicketsSortIssue endpoint
  describe('getTicketsSortIssue',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortIssue')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortIssue()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortIssue').mockResolvedValue(null);
        expect(await provider.getTicketsSortIssue()).toEqual(null);
      });
  })

  //getTicketsSortCity endpoint
  describe('getTicketsSortCity',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortCity')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortCity()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortCity').mockResolvedValue(null);
        expect(await provider.getTicketsSortCity()).toEqual(null);
      });
  })  
 
  //getTicketsSortStatus endpoint
  describe('getTicketsSortStatus',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortStatus')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortStatus()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortStatus').mockResolvedValue(null);
        expect(await provider.getTicketsSortStatus()).toEqual(null);
      });
  })

  //getTicketsSortUpvotes endpoint
  describe('getTicketsSortUpvotes',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortUpvotes')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortUpvotes()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortUpvotes').mockResolvedValue(null);
        expect(await provider.getTicketsSortUpvotes()).toEqual(null);
      });
  })

  //getTicketsSortCity endpoint
  describe('getTicketsSortCity',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortCity')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortCity()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortCity').mockResolvedValue(null);
        expect(await provider.getTicketsSortCity()).toEqual(null);
      });
  })  
 
  //getTicketsSortStatus endpoint
  describe('getTicketsSortStatus',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortStatus')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortStatus()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortStatus').mockResolvedValue(null);
        expect(await provider.getTicketsSortStatus()).toEqual(null);
      });
  }) 

  //getTicketsSortUpvotes endpoint
  describe('getTicketsSortUpvotes',()=>{
    const arrayOfTickets:TicketDto[] = [];
      it('should return tickets',async ()=>{
        jest
        .spyOn(provider,'getTicketsSortUpvotes')
        .mockImplementation(():Promise<TicketDto[]>=>Promise.resolve(arrayOfTickets))
        expect(await provider.getTicketsSortUpvotes()).toMatchObject(
          expect.arrayContaining(arrayOfTickets)
        )
      });
      
      it('should return null', async () => {
        jest.spyOn(provider, 'getTicketsSortUpvotes').mockResolvedValue(null);
        expect(await provider.getTicketsSortUpvotes()).toEqual(null);
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

  //updateTicket
  describe('updateTicket',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTicket')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTicket(1,ticketDtoMock)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTicket').mockResolvedValue(null);
      expect(await provider.updateTicket(1,ticketDtoMock)).toEqual(null);
    });
  })

  //updateStatus
  describe('updateStatus',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateStatus')
      .mockImplementation(():Promise<void> => Promise.resolve());

      expect(await provider.updateStatus(2,ticketDtoMock.ticketStatus)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateStatus').mockResolvedValue(null);
      expect(await provider.updateStatus(2,ticketDtoMock.ticketStatus)).toEqual(null);
    });
  })

  //updateCreateDate
  describe('updateCreateDate',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateCreateDate')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateCreateDate(3,ticketDtoMock.ticketCreateDate)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateCreateDate').mockResolvedValue(null);
      expect(await provider.updateCreateDate(3,ticketDtoMock.ticketCreateDate)).toEqual(null);
    });
  })

  //updateCloseDate
  describe('updateCloseDate',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateCloseDate')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateCloseDate(3,ticketDtoMock.ticketCloseDate)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateCloseDate').mockResolvedValue(null);
      expect(await provider.updateCloseDate(3,ticketDtoMock.ticketCloseDate)).toEqual(null);
    });
  })

  //updateType
  describe('updateType',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateType')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateType(3,ticketDtoMock.ticketType)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateType').mockResolvedValue(null);
      expect(await provider.updateType(3,ticketDtoMock.ticketType)).toEqual(null);
    });
  })

  //updateLocation
  describe('updateLocation',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateLocation')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateLocation(3,ticketDtoMock.ticketLocation)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateLocation').mockResolvedValue(null);
      expect(await provider.updateLocation(3,ticketDtoMock.ticketLocation)).toEqual(null);
    });
  })

  //updateCost
  describe('updateCost',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateCost')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateCost(1,ticketDtoMock.ticketCost)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateCost').mockResolvedValue(null);
      expect(await provider.updateCost(1,ticketDtoMock.ticketCost)).toEqual(null);
    });
  })

  //updateDescription
  describe('updateDescription',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateDescription')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateDescription(1,ticketDtoMock.ticketDescription)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateDescription').mockResolvedValue(null);
      expect(await provider.updateDescription(1,ticketDtoMock.ticketDescription)).toEqual(null);
    });
  })

  //updateRepairTime
  describe('updateRepairTime',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateRepairTime')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateRepairTime(1,ticketDtoMock.ticketRepairTime)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateRepairTime').mockResolvedValue(null);
      expect(await provider.updateRepairTime(1,ticketDtoMock.ticketRepairTime)).toEqual(null);
    });
  })

  //updateupvotes
  describe('updateUpvotes',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateUpvotes')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateUpvotes(1,ticketDtoMock.ticketUpvotes)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateUpvotes').mockResolvedValue(null);
      expect(await provider.updateUpvotes(1,ticketDtoMock.ticketUpvotes)).toEqual(null);
    });
  })

  //incUpvotes
  describe('incUpvotes',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'incUpvotes')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.incUpvotes(1)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'incUpvotes').mockResolvedValue(null);
      expect(await provider.incUpvotes(1)).toEqual(null);
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
    
/////////////////////////
///// Picture tests /////
/////////////////////////

  //createPicture endpoint
  describe('createPicture',()=>{

    it('should return null', async () => {
      jest.spyOn(provider, 'createPicture').mockResolvedValue(null);
      expect(await provider.createPicture(2,"mypc/pictures")).toEqual(null)
    });
  })

  //getPicture endpoint
  describe('getPicture',()=>{
    const arrayOfTickets:Picture[] = [];
    it('should return a picture',async ()=>{
      jest
      .spyOn(provider,'getPicture')
      .mockImplementation(():Promise<Picture[]>=>Promise.resolve(arrayOfTickets))
      expect(await provider.getPicture(2)).toMatchObject(
        expect.arrayContaining(arrayOfTickets)
      )
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'getAllPictures').mockResolvedValue(null);
      
      expect(await provider.getAllPictures(2)).toEqual(null);
    });
  });

  //getAllPictures endpoint
  describe('getAllPictures',()=>{
    const arrayOfPictures:Picture[] = [];
    it('should return all pictures',async ()=>{
      jest
      .spyOn(provider,'getAllPictures')
      .mockImplementation(():Promise<Picture[]>=>Promise.resolve(arrayOfPictures))
      expect(await provider.getAllPictures(1)).toMatchObject(
        expect.arrayContaining(arrayOfPictures)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(provider, 'getAllPictures').mockResolvedValue(null);
      
      expect(await provider.getAllPictures(2)).toEqual(null);
    });
  });

  //UpdatePicture 
  describe('UpdatePicture',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updatePicture')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updatePicture(2,"mypc/pictures")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updatePicture').mockResolvedValue(null);
      expect(await provider.updatePicture(2,"mypc/pictures")).toEqual(null)
    });
  });

  //DeletePicture
  describe('deletePicture',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'deletePicture')
      .mockImplementation(():Promise<void> => Promise.resolve());

      expect(await provider.deletePicture(2)).toBeUndefined()
    });
  
    it('should return null', async () => {
      jest.spyOn(provider, 'deletePicture').mockResolvedValue(null);
      expect(await provider.deletePicture(2)).toEqual(null);
    });
  });
  //////////////////////
  ////// Subtasks //////
  //////////////////////

  //createSubtask endpoint
  describe('createSubtask',()=>{

    it('should return null', async () => {
      jest.spyOn(provider, 'createSubtask').mockResolvedValue(null);
      expect(await provider.createSubtask(2,"Get materials needed",2,"Waiting")).toEqual(null)
    });
  })

  //getTicketSubtasks endpoint
  describe('getTicketSubtasks',()=>{
    const arrayOfSubtasks: Subtasks[] = [];
    it('should return a picture',async ()=>{
      jest
      .spyOn(provider,'getTicketSubtasks')
      .mockImplementation(():Promise<Subtasks[]>=>Promise.resolve(arrayOfSubtasks))
      expect(await provider.getTicketSubtasks(2)).toMatchObject(
        expect.arrayContaining(arrayOfSubtasks)
      )
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'getTicketSubtasks').mockResolvedValue(null);
      expect(await provider.getTicketSubtasks(2)).toEqual(null);
    });
  });

  //updateSubtask 
  describe('updateSubtask',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateSubtask')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateSubtask(2,2,"Get materials needed",2,"Waiting")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateSubtask').mockResolvedValue(null);
      expect(await provider.updateSubtask(2,2,"Get materials needed",2,"Waiting")).toEqual(null)
    });
  });

  //updateSubtaskTicket 
  describe('updateSubtaskTicket',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateSubtaskTicket')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateSubtaskTicket(2,2)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateSubtaskTicket').mockResolvedValue(null);
      expect(await provider.updateSubtaskTicket(2,2)).toEqual(null)
    });
  });

  //updateSubtaskDesc 
  describe('updateSubtaskDesc',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateSubtaskDesc')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateSubtaskDesc(2,"Need to get materials")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateSubtaskDesc').mockResolvedValue(null);
      expect(await provider.updateSubtaskDesc(2,"Need to get materials")).toEqual(null)
    });
  });
  
  //updateSubtaskStep 
  describe('updateSubtaskStep',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateSubtaskStep')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateSubtaskStep(2,5)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateSubtaskStep').mockResolvedValue(null);
      expect(await provider.updateSubtaskStep(2,5)).toEqual(null)
    });
  });

  //updateSubtaskStatus 
  describe('updateSubtaskStatus',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateSubtaskStatus')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateSubtaskStatus(2,"Waiting")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateSubtaskStatus').mockResolvedValue(null);
      expect(await provider.updateSubtaskStatus(2,"Waiting")).toEqual(null)
    });
  });  

  //deleteSubtask
  describe('deleteSubtask',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'deleteSubtask')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.deleteSubtask(2)).toBeUndefined()
    });
  
    it('should return null', async () => {
      jest.spyOn(provider, 'deleteSubtask').mockResolvedValue(null);
      expect(await provider.deleteSubtask(2)).toEqual(null);
    });
  });

});
