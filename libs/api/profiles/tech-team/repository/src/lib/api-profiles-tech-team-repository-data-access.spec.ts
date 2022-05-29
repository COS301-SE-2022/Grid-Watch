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
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'createTechTeam')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.createTechTeam("Sparky", "sparky@gmail.com", "Electricity","0119873322")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'createTechTeam').mockResolvedValue(null);
      expect(await provider.createTechTeam("Sparkyyy", "sparkyyy@gmail.com", "Electricity","0119873322")).toBeUndefined()
    });
  })

  //UpdateTechTeam
  describe('UpdateTechTeam',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'UpdateTechTeam')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.createTechTeam("Sparkles", "sparkyyy@gmail.com", "Electricity","0119873322")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'UpdateTechTeam').mockResolvedValue(null);
      expect(await provider.createTechTeam("Sparkles", "sparkyyy@gmail.com", "Electricity","0119873322")).toBeUndefined()
    });
  })

    //UpdateTechTeamName
    describe('UpdateTechTeamName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateTechTeamName')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.UpdateTechTeamName(3,"Sparks")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateTechTeamName').mockResolvedValue(null);

        expect(await provider.UpdateTechTeamName(3,"Sparks")).toEqual(null);
      });
    })

    //UpdateTechTeamEmail
    describe('UpdateTechTeamEmail',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateTechTeamEmail')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateTechTeamEmail(3,"Sparks@gmail.com")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateTechTeamEmail').mockResolvedValue(null);
        expect(await provider.UpdateTechTeamEmail(3,"Sparks@gmail.com")).toEqual(null);
      });
    })

    //UpdateTechTeamSpecialisation
    describe('UpdateTechTeamSpecialisation',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateTechTeamSpecialisation')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateTechTeamSpecialisation(3,"Potholes")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateTechTeamSpecialisation').mockResolvedValue(null);
        expect(await provider.UpdateTechTeamSpecialisation(3,"Potholes")).toEqual(null);
      });
    })

    //UpdateTechTeamContactNr
    describe('UpdateTechTeamContactNr',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateTechTeamContactNr')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateTechTeamContactNr(3,"0122238843")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateTechTeamContactNr').mockResolvedValue(null);
        expect(await provider.UpdateTechTeamContactNr(3,"0122238843")).toEqual(null);
      });
    })

    //UpdateTechTeamNrJobsCompleted
    describe('UpdateTechTeamNrJobsCompleted',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateTechTeamNrJobsCompleted')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateTechTeamNrJobsCompleted(3,21)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateTechTeamNrJobsCompleted').mockResolvedValue(null);
        expect(await provider.UpdateTechTeamNrJobsCompleted(3,21)).toEqual(null);
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
    // })

    //UpdateTechTeamRatingJobs
    describe('UpdateTechTeamRatingJobs',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'UpdateTechTeamRatingJobs')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.UpdateTechTeamRatingJobs(1,3)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'UpdateTechTeamRatingJobs').mockResolvedValue(null);
        expect(await provider.UpdateTechTeamRatingJobs(1,3)).toEqual(null);
      });
    })

    //DeleteTechTeam
    describe('DeleteTechTeam',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'DeleteTechTeam')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.DeleteTechTeam(2)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'DeleteTechTeam').mockResolvedValue(null);

        expect(await provider.DeleteTechTeam(2)).toEqual(null);
      });
    })

});
