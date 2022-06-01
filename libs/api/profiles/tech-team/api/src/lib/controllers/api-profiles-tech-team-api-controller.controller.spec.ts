import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamApiControllerController } from './api-profiles-tech-team-api-controller.controller';
import { ApiProfilesTechTeamServiceService} from '@grid-watch/api/profiles/tech-team/service';
import { techTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

const techTeamDtoMock: jest.Mocked<techTeamDto> = new techTeamDto() as techTeamDto;

describe('ApiProfilesTechTeamApiControllerController', () => {
  let controller: ApiProfilesTechTeamApiControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesTechTeamApiControllerController],
      providers: [ApiProfilesTechTeamServiceService,CommandBus,QueryBus],
    }).compile();

    controller = module.get<ApiProfilesTechTeamApiControllerController>(
      ApiProfilesTechTeamApiControllerController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //CreateTechTeam endpoint
  describe('CreateTechTeam',()=>{
    it('should return true ',async ()=>{
      jest
      .spyOn(controller,'CreateTechTeam')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.CreateTechTeam(techTeamDtoMock)).toEqual(
        true
      )
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'CreateTechTeam').mockResolvedValue(false);
  
      expect(await controller.CreateTechTeam(techTeamDtoMock)).toEqual(false);
    });
  })

  //Update Tech Team endpoint
  describe('UpdateTechTeam',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'UpdateTechTeam')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.UpdateTechTeam(1,techTeamDtoMock)).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'UpdateTechTeam').mockResolvedValue(false);
  
      expect(await controller.UpdateTechTeam(1,null)).toEqual(false);
    });
  })

  //UpdateTechTeamName endpoint
  describe('UpdateTechTeamName',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'UpdateTechTeamName')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.UpdateTechTeamName(1,"name")).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'UpdateTechTeamName').mockResolvedValue(false);
  
      expect(await controller.UpdateTechTeamName(1,null)).toEqual(false);
    });
  })

  //UpdateTechTeamSpecialisation endpoint
  describe('UpdateTechTeamSpecialisation',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'UpdateTechTeamSpecialisation')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.UpdateTechTeamSpecialisation(1,"specialisation")).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'UpdateTechTeamSpecialisation').mockResolvedValue(false);
  
      expect(await controller.UpdateTechTeamSpecialisation(1,null)).toEqual(false);
    });
  })  

  //UpdateTechTeamContactNr endpoint
  describe('UpdateTechTeamContactNr',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'UpdateTechTeamContactNr')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.UpdateTechTeamContactNr(1,"0714210800")).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'UpdateTechTeamContactNr').mockResolvedValue(false);
  
      expect(await controller.UpdateTechTeamContactNr(1,null)).toEqual(false);
    });
  })  

  //UpdateTechTeamNrJobsCompleted endpoint
  describe('UpdateTechTeamNrJobsCompleted',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'UpdateTechTeamNrJobsCompleted')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.UpdateTechTeamNrJobsCompleted(1,20)).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'UpdateTechTeamNrJobsCompleted').mockResolvedValue(false);
  
      expect(await controller.UpdateTechTeamNrJobsCompleted(1,null)).toEqual(false);
    });
  })    

  //UpdateTechTeamRatingJobs endpoint
  describe('UpdateTechTeamRatingJobs',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'UpdateTechTeamRatingJobs')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.UpdateTechTeamRatingJobs(1,70)).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'UpdateTechTeamRatingJobs').mockResolvedValue(false);
  
      expect(await controller.UpdateTechTeamRatingJobs(1,null)).toEqual(false);
    });
  })    

});
