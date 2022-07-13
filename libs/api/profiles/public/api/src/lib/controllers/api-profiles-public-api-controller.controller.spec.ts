import { ApiProfilesPublicApiController } from './api-profiles-public-api-controller.controller';
import {ApiProfilesPublicService} from '@grid-watch/api/profiles/public/service'
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ApiProfilesPublicApiController', () => {
  let controller: ApiProfilesPublicApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesPublicApiController],
      providers:[ApiProfilesPublicService,CommandBus,QueryBus]
    }).compile();

    await module.init();

    controller = module.get<ApiProfilesPublicApiController>(ApiProfilesPublicApiController);
  });
})