import { Module } from '@nestjs/common';
import { ApiAiTechTeamApiController } from './api-ai-tech-team-api.controller';

@Module({
  controllers: [ApiAiTechTeamApiController],
  providers: [],
  exports: [],
})
export class ApiAiTechTeamApiModule {}
