import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamApiControllerController } from './api-profiles-tech-team-api-controller.controller';
import { ApiProfilesTechTeamServiceService} from '@grid-watch/api/profiles/tech-team/service';
//import { techTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

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
});
