import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamApiControllerController } from './api-profiles-tech-team-api-controller.controller';
import { ApiProfilesTechTeamServiceService} from '@grid-watch/api/profiles/tech-team/service';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

const techTeamDtoMock: jest.Mocked<TechTeamDto> = new TechTeamDto() as TechTeamDto;

describe('ApiProfilesTechTeamApiControllerController', () => {
  let controller: ApiProfilesTechTeamApiControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesTechTeamApiControllerController],
      providers: [ApiProfilesTechTeamServiceService,CommandBus,QueryBus, JwtService],
    }).compile();

    controller = module.get<ApiProfilesTechTeamApiControllerController>(
      ApiProfilesTechTeamApiControllerController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //createTechTeam endpoint
  describe('createTechTeam',()=>{
    it('should return true ',async ()=>{
      jest
      .spyOn(controller,'createTechTeam')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.createTechTeam(techTeamDtoMock)).toEqual(
        true
      )
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'createTechTeam').mockResolvedValue(false);
  
      expect(await controller.createTechTeam(techTeamDtoMock)).toEqual(false);
    });
  })

  //update Tech Team endpoint
  describe('updateTechTeam',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'updateTechTeam')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.updateTechTeam(1,techTeamDtoMock)).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'updateTechTeam').mockResolvedValue(false);
  
      expect(await controller.updateTechTeam(1,null)).toEqual(false);
    });
  })

  //updateTechTeamName endpoint
  describe('updateTechTeamName',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'updateTechTeamName')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.updateTechTeamName(1,"name")).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'updateTechTeamName').mockResolvedValue(false);
  
      expect(await controller.updateTechTeamName(1,null)).toEqual(false);
    });
  })

  //updateTechTeamSpecialisation endpoint
  describe('updateTechTeamSpecialisation',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'updateTechTeamSpecialisation')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.updateTechTeamSpecialisation(1,"specialisation")).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'updateTechTeamSpecialisation').mockResolvedValue(false);
  
      expect(await controller.updateTechTeamSpecialisation(1,null)).toEqual(false);
    });
  })  

  //updateTechTeamContactNr endpoint
  describe('updateTechTeamContactNr',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'updateTechTeamContactNr')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.updateTechTeamContactNr(1,"0714210800")).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'updateTechTeamContactNr').mockResolvedValue(false);
  
      expect(await controller.updateTechTeamContactNr(1,null)).toEqual(false);
    });
  })  

  //updateTechTeamNrJobsCompleted endpoint
  describe('updateTechTeamNrJobsCompleted',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'updateTechTeamNrJobsCompleted')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.updateTechTeamNrJobsCompleted(1,20)).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'updateTechTeamNrJobsCompleted').mockResolvedValue(false);
  
      expect(await controller.updateTechTeamNrJobsCompleted(1,null)).toEqual(false);
    });
  })    

  //updateTechTeamRatingJobs endpoint
  describe('updateTechTeamRatingJobs',()=>{
    it('should return true',async ()=>{
      jest
      .spyOn(controller,'updateTechTeamRatingJobs')
      .mockImplementation(():Promise<boolean> => Promise.resolve(true));

      expect(await controller.updateTechTeamRatingJobs(1,70)).toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(controller, 'updateTechTeamRatingJobs').mockResolvedValue(false);
  
      expect(await controller.updateTechTeamRatingJobs(1,null)).toEqual(false);
    });
  })    

});
