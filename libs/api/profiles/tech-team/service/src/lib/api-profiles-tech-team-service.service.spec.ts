import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamServiceService } from './api-profiles-tech-team-service.service';
import {CommandBus} from '@nestjs/cqrs';
import {techTeamDto} from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';

const techTeamDtoMock: jest.Mocked<techTeamDto> = new techTeamDto() as techTeamDto;

describe('ApiProfilesTechTeamServiceService', () => {
  let service: ApiProfilesTechTeamServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesTechTeamServiceService,CommandBus],
    }).compile();

    await module.init();

    service = module.get<ApiProfilesTechTeamServiceService>(
      ApiProfilesTechTeamServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('createTechTeam',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'createTechTeam')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.createTechTeam('name','email','specialisation','contact')).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'createTechTeam').mockResolvedValue(null);

      expect(await service.createTechTeam('name','email','specialisation','contact')).toEqual(null);
    })
  })


  describe('updateTechTeam',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'updateTechTeam')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.updateTechTeam(1,'name','email','specialisation','contact')).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'updateTechTeam').mockResolvedValue(null);

      expect(await service.updateTechTeam(1,'name','email','specialisation','contact')).toEqual(null);
    })
  })

  describe('updateTechTeamName',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'updateTechTeamName')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.updateTechTeamName(1,'name')).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'updateTechTeamName').mockResolvedValue(null);

      expect(await service.updateTechTeamName(1,'name')).toEqual(null);
    })
  })

  describe('updateTechTeamEmail',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'updateTechTeamEmail')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.updateTechTeamEmail(1,'email')).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'updateTechTeamEmail').mockResolvedValue(null);

      expect(await service.updateTechTeamEmail(1,'email')).toEqual(null);
    })
  })
  

  describe('updateTechTeamSpecialisation',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'updateTechTeamSpecialisation')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.updateTechTeamSpecialisation(1,'specialisation')).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'updateTechTeamSpecialisation').mockResolvedValue(null);

      expect(await service.updateTechTeamSpecialisation(1,'specialisation')).toEqual(null);
    })
  })

  describe('updateTechTeamContactNr',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'updateTechTeamContactNr')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.updateTechTeamContactNr(1,'contact')).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'updateTechTeamContactNr').mockResolvedValue(null);

      expect(await service.updateTechTeamContactNr(1,'contact')).toEqual(null);
    })
  })

  describe('updateTechTeamNrJobsCompleted',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'updateTechTeamNrJobsCompleted')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.updateTechTeamNrJobsCompleted(1,1)).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'updateTechTeamNrJobsCompleted').mockResolvedValue(null);

      expect(await service.updateTechTeamNrJobsCompleted(1,1)).toEqual(null);
    })
  })


  describe('IncTechTeamNrJobsCompleted',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'IncTechTeamNrJobsCompleted')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.IncTechTeamNrJobsCompleted(1)).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'IncTechTeamNrJobsCompleted').mockResolvedValue(null);

      expect(await service.IncTechTeamNrJobsCompleted(1)).toEqual(null);
    })
  })


  describe('updateTechTeamRatingJobs',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'updateTechTeamRatingJobs')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.updateTechTeamRatingJobs(1,1.1)).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'updateTechTeamRatingJobs').mockResolvedValue(null);

      expect(await service.updateTechTeamRatingJobs(1,1.1)).toEqual(null);
    })
  })

  describe('DeleteTechTeam',()=>{
    it('should return a Tech team',async()=>{
      jest
      .spyOn(service,'DeleteTechTeam')
      .mockImplementation((): Promise<techTeamDto> => Promise.resolve(techTeamDtoMock));

      expect(await service.DeleteTechTeam(1)).toMatchObject(techTeamDtoMock)
    })

    it('should return null',async()=>{
      jest.spyOn(service,'DeleteTechTeam').mockResolvedValue(null);

      expect(await service.DeleteTechTeam(1)).toEqual(null);
    })
  })


});



