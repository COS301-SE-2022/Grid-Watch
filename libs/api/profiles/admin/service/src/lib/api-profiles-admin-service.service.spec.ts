import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesAdminService } from './api-profiles-admin-service.service';

describe('ApiProfilesAdminServiceService', () => {
  let service: ApiProfilesAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesAdminService],
    }).compile();

    service = module.get<ApiProfilesAdminService>(
      ApiProfilesAdminService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
