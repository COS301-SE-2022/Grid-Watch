import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesAdminApiController } from './api-profiles-admin-api-controller.controller';

describe('ApiProfilesAdminApiController', () => {
  let controller: ApiProfilesAdminApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesAdminApiController],
    }).compile();

    controller = module.get<ApiProfilesAdminApiController>(
      ApiProfilesAdminApiController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
