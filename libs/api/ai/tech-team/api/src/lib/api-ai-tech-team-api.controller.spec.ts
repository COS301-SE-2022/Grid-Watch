import { Test } from '@nestjs/testing';
import { ApiAiTechTeamApiController } from './api-ai-tech-team-api.controller';

describe('ApiAiTechTeamApiController', () => {
  let controller: ApiAiTechTeamApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAiTechTeamApiController],
    }).compile();

    controller = module.get(ApiAiTechTeamApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
