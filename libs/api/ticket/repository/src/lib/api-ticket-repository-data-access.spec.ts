import { Test, TestingModule } from '@nestjs/testing';
import { ApiTicketRepositoryDataAccess } from './api-ticket-repository-data-access';

describe('ApiTicketRepositoryDataAccess', () => {
  let provider: ApiTicketRepositoryDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiTicketRepositoryDataAccess],
    }).compile();

    provider = module.get<ApiTicketRepositoryDataAccess>(
      ApiTicketRepositoryDataAccess
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
