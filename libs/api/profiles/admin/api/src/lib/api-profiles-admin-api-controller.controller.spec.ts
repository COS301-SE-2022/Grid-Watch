import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesAdminApiController } from './api-profiles-admin-api-controller.controller';
import {ApiProfilesAdminService} from '@grid-watch/api/profiles/admin/service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('ApiProfilesAdminApiController', () => {
  let controller: ApiProfilesAdminApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesAdminApiController],
      providers:[ApiProfilesAdminService,CommandBus,QueryBus]
    }).compile();

    await module.init();

    controller = module.get<ApiProfilesAdminApiController>(ApiProfilesAdminApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
})
