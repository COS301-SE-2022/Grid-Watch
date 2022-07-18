import { Test } from '@nestjs/testing';
import { ApiAiNotificationsApiController } from './api-ai-notifications-api.controller';

describe('ApiAiNotificationsApiController', () => {
  let controller: ApiAiNotificationsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAiNotificationsApiController],
    }).compile();

    controller = module.get(ApiAiNotificationsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
