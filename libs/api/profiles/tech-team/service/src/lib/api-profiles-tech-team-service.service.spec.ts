import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamServiceService } from './api-profiles-tech-team-service.service';
import {CommandBus} from '@nestjs/cqrs';

describe('ApiProfilesTechTeamServiceService', () => {
  let service: ApiProfilesTechTeamServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesTechTeamServiceService,CommandBus],
    }).compile();

    service = module.get<ApiProfilesTechTeamServiceService>(
      ApiProfilesTechTeamServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
