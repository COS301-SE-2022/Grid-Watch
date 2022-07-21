import { Module } from '@nestjs/common';
import { ApiAiAdminApiController } from './api-ai-admin-api.controller';

@Module({
  controllers: [ApiAiAdminApiController],
  providers: [],
  exports: [],
})
export class ApiAiAdminApiModule {}
