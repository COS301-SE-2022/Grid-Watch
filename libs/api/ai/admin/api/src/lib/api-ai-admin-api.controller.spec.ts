import { Test } from '@nestjs/testing';
import { ApiAiAdminApiController } from './api-ai-admin-api.controller';

describe('ApiAiAdminApiController', () => {
  let controller: ApiAiAdminApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAiAdminApiController],
    }).compile();

    controller = module.get(ApiAiAdminApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
