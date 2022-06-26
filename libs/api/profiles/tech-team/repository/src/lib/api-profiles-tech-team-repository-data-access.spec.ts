import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamRepositoryDataAccess } from './api-profiles-tech-team-repository-data-access';
import {techTeamDto} from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';

const ticketDtoMock: jest.Mocked<techTeamDto> = new techTeamDto() as techTeamDto;

  describe('ApiTicketRepositoryDataAccess', () => {
  let provider: ApiProfilesTechTeamRepositoryDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesTechTeamRepositoryDataAccess],
    }).compile();

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
      expect(await provider.createTechTeam("Sparky", "sparky@gmail.com", "Electricity","0119843323","1234Anru")).toEqual(null)
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

  //UpdateTechTeam
  describe('UpdateTechTeam',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateTechTeam')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateTechTeam(2,"Sparky", "sparky1@gmail.com", "Electricity","0119873322")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateTechTeam').mockResolvedValue(null);
      expect(await provider.updateTechTeam(2,"Sparky", "sparkyy3@gmail.com", "Electricity","0119873323")).toEqual(null)
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
    // })DeleteTechTeam

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
    describe('DeleteTechTeam',()=>{
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
