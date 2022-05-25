import { Module } from '@nestjs/common';
import { ApiProfilesTechTeamServiceService } from './api-profiles-tech-team-service.service';

@Module({
  controllers: [],
  providers: [ApiProfilesTechTeamServiceService],
  exports: [],
})
export class ApiProfilesTechTeamServiceModule {}
