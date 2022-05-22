import { Module } from '@nestjs/common';
import { ApiProfilesTechTeamApiControllerController } from './controllers/api-profiles-tech-team-api-controller.controller';

@Module({
  controllers: [ApiProfilesTechTeamApiControllerController],
  providers: [],
  exports: [],
})
export class ApiProfilesTechTeamApiModule {}
