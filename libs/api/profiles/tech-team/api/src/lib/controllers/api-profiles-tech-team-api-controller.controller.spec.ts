import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesTechTeamApiControllerController } from './api-profiles-tech-team-api-controller.controller';

describe('ApiProfilesTechTeamApiControllerController', () => {
  let controller: ApiProfilesTechTeamApiControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesTechTeamApiControllerController],
    }).compile();

    controller = module.get<ApiProfilesTechTeamApiControllerController>(
      ApiProfilesTechTeamApiControllerController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
