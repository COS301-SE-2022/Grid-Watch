import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesPublicService } from './api-profiles-public.service';

describe('ApiProfilesPublicService', () => {
  let service: ApiProfilesPublicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesPublicService],
    }).compile();

    service = module.get<ApiProfilesPublicService>(ApiProfilesPublicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
