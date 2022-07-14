import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamRepositoryDataAccess } from './api-profiles-tech-team-repository-data-access';
import {TechTeamDto} from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';

const techTeamDtoMock: jest.Mocked<TechTeamDto> = new TechTeamDto() as TechTeamDto;

  describe('ApiTicketRepositoryDataAccess', () => {
  let provider: ApiProfilesTechTeamRepositoryDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesTechTeamRepositoryDataAccess],
    }).compile();

  
    techTeamDtoMock.name = "Sparky";
    techTeamDtoMock.email = "sparkyy3@gmail.com";
    techTeamDtoMock.specialisation = "Electricity";
    techTeamDtoMock.contactNumber= "0119873323";

    provider = module.get<ApiProfilesTechTeamRepositoryDataAccess>(
      ApiProfilesTechTeamRepositoryDataAccess
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  //createTechTeam endpoint
  describe('createTechTeam',()=>{
    // it('should return void',async ()=>{
    //   jest
    //   .spyOn(provider,'createTechTeam')
    //  // .mockImplementation(():Promise<void> => Promise.resolve());
    //   expect(await provider.createTechTeam("Sparky", "sparkyy@gmail.com", "Electricity","0119874322", "1234Anru")).toBeDefined()
    // });

    it('should return null', async () => {
      jest.spyOn(provider, 'createTechTeam').mockResolvedValue(null);
      expect(await provider.createTechTeam(techTeamDtoMock)).toEqual(null)
    });
  })

  // describe('verifyPassword',()=>{
  //   it('should return true',async ()=>{
  //     jest
  //     .spyOn(provider,'verifyPassword')
  //     .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  //     expect(await provider.verifyPassword("sparky@gmail.com", "123Anru")).toEqual(false)
  //   });
  // })

  //getTechTeams endpoint
  describe('getTechTeams',()=>{
    const arrayOfTechTeams:TechTeamDto[] = [];
    it('should return all techteams',async ()=>{
      jest
      .spyOn(provider,'getTechTeams')
      .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
      expect(await provider.getTechTeams()).toMatchObject(
        expect.arrayContaining(arrayOfTechTeams)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(provider, 'getTechTeams').mockResolvedValue(null);
      expect(await provider.getTechTeams()).toEqual(null);
    });
  })
  
  //getTechTeamId endpoint
  describe('getTechTeamId',()=>{
    const arrayOfTechTeams:TechTeamDto[] = [];
      it('should return a techteam',async ()=>{
        jest
        .spyOn(provider,'getTechTeamId')
        .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
        expect(await provider.getTechTeamId(2)).toMatchObject(
          expect.arrayContaining(arrayOfTechTeams)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getTechTeamId').mockResolvedValue(null);
        
        expect(await provider.getTechTeamId(2)).toEqual(null);
      });
  })

  //getTechTeamName endpoint
  describe('getTechTeamName',()=>{
    const arrayOfTechTeams:TechTeamDto[] = [];
      it('should return a techteam',async ()=>{
        jest
        .spyOn(provider,'getTechTeamName')
        .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
        expect(await provider.getTechTeamName(techTeamDtoMock.name)).toMatchObject(
          expect.arrayContaining(arrayOfTechTeams)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getTechTeamName').mockResolvedValue(null); 
        expect(await provider.getTechTeamName(techTeamDtoMock.name)).toEqual(null);
      });
  })

    //searchTechTeamName endpoint
    describe('searchTechTeamName',()=>{
      const arrayOfTechTeams:TechTeamDto[] = [];
        it('should return a techteam',async ()=>{
          jest
          .spyOn(provider,'searchTechTeamName')
          .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
          expect(await provider.searchTechTeamName(techTeamDtoMock.name)).toMatchObject(
            expect.arrayContaining(arrayOfTechTeams)
          )
        });

        it('should return null', async () => {
          jest.spyOn(provider, 'searchTechTeamName').mockResolvedValue(null); 
          expect(await provider.searchTechTeamName(techTeamDtoMock.name)).toEqual(null);
        });
    })

  //getTechTeamName endpoint
  describe('getTechTeamName',()=>{
    const arrayOfTechTeams:TechTeamDto[] = [];
      it('should return a techteam',async ()=>{
        jest
        .spyOn(provider,'getTechTeamName')
        .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
        expect(await provider.getTechTeamId(2)).toMatchObject(
          expect.arrayContaining(arrayOfTechTeams)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getTechTeamName').mockResolvedValue(null); 
        expect(await provider.getTechTeamName(techTeamDtoMock.name)).toEqual(null);
      });
  })

  //getTechTeamEmail endpoint
  describe('getTechTeamEmail',()=>{
    const arrayOfTechTeams:TechTeamDto[] = [];
      it('should return a techteam',async ()=>{
        jest
        .spyOn(provider,'getTechTeamEmail')
        .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
        expect(await provider.getTechTeamEmail(techTeamDtoMock.email)).toMatchObject(
          expect.arrayContaining(arrayOfTechTeams)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getTechTeamEmail').mockResolvedValue(null); 
        expect(await provider.getTechTeamEmail(techTeamDtoMock.email)).toEqual(null);
      });
    })  

  //getTechTeamSpecialisation endpoint
  describe('getTechTeamSpecialisation',()=>{
    const arrayOfTechTeams:TechTeamDto[] = [];
      it('should return techteams',async ()=>{
        jest
        .spyOn(provider,'getTechTeamSpecialisation')
        .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
        expect(await provider.getTechTeamSpecialisation(techTeamDtoMock.specialisation)).toMatchObject(
          expect.arrayContaining(arrayOfTechTeams)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getTechTeamSpecialisation').mockResolvedValue(null); 
        expect(await provider.getTechTeamSpecialisation(techTeamDtoMock.specialisation)).toEqual(null);
      });
  })

  //getTechTeamContactNr endpoint
  describe('getTechTeamContactNr',()=>{
    const arrayOfTechTeams:TechTeamDto[] = [];
      it('should return a techteam',async ()=>{
        jest
        .spyOn(provider,'getTechTeamContactNr')
        .mockImplementation(():Promise<TechTeamDto[]>=>Promise.resolve(arrayOfTechTeams))
        expect(await provider.getTechTeamContactNr(techTeamDtoMock.contactNumber)).toMatchObject(
          expect.arrayContaining(arrayOfTechTeams)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getTechTeamContactNr').mockResolvedValue(null); 
        expect(await provider.getTechTeamContactNr(techTeamDtoMock.contactNumber)).toEqual(null);
      });
  })

  //UpdateTechTeam
  describe('UpdateTechTeam',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTechTeam')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTechTeam(2,techTeamDtoMock)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTechTeam').mockResolvedValue(null);
      expect(await provider.updateTechTeam(2,techTeamDtoMock)).toEqual(null)
    });
  })

    //updateTechTeamName
    describe('updateTechTeamName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateTechTeamName')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateTechTeamName(3,"Sparks")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateTechTeamName').mockResolvedValue(null);
        expect(await provider.updateTechTeamName(3,"Sparks")).toEqual(null);
      });
    })

  //updateTechTeamEmail
  describe('updateTechTeamEmail',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTechTeamEmail')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTechTeamEmail(3,"Sparks@gmail.com")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTechTeamEmail').mockResolvedValue(null);
      expect(await provider.updateTechTeamEmail(3,"Sparks@gmail.com")).toEqual(null);
    });
  })

  //updateTechTeamSpecialisation
  describe('updateTechTeamSpecialisation',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTechTeamSpec')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTechTeamSpec(3,"Potholes")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTechTeamSpec').mockResolvedValue(null);
      expect(await provider.updateTechTeamSpec(3,"Potholes")).toEqual(null);
    });
  })

  //updateTechTeamContactNr
  describe('updateTechTeamContactNr',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTechTeamContactNr')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTechTeamContactNr(3,"0122238843")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTechTeamContactNr').mockResolvedValue(null);
      expect(await provider.updateTechTeamContactNr(3,"0122238843")).toEqual(null);
    });
  })

  //updateTechTeamNrJobsCompleted
  describe('updateTechTeamNrJobsCompleted',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTechTeamNrJobsCompleted')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTechTeamNrJobsCompleted(3,21)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTechTeamNrJobsCompleted').mockResolvedValue(null);
      expect(await provider.updateTechTeamNrJobsCompleted(3,21)).toEqual(null);
    });
  })

  // //IncTechTeamNrJobsCompleted
  // describe('IncTechTeamNrJobsCompleted',()=>{
  //   it('should return void',async ()=>{
  //     jest
  //     .spyOn(provider,'IncTechTeamNrJobsCompleted')
  //     .mockImplementation(():Promise<void> => Promise.resolve());
  //     expect(await provider.IncTechTeamNrJobsCompleted(3)).toBeUndefined()
  //   });

  //   it('should return null', async () => {
  //     jest.spyOn(provider, 'IncTechTeamNrJobsCompleted').mockResolvedValue(null);
  //     expect(await provider.IncTechTeamNrJobsCompleted(3)).toEqual(null);
  //   });

  //updateTechTeamRatingJobs
  describe('updateTechTeamRatingJobs',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTechTeamRatingJobs')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTechTeamRatingJobs(1,3)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTechTeamRatingJobs').mockResolvedValue(null);
      expect(await provider.updateTechTeamRatingJobs(1,3)).toEqual(null);
    });
  })

  //DeleteTechTeam
  describe('deleteTechTeam',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'deleteTechTeam')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.deleteTechTeam(2)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'deleteTechTeam').mockResolvedValue(null);
      expect(await provider.deleteTechTeam(2)).toEqual(null);
    });
  })

});
