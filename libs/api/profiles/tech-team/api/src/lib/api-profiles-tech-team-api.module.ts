import { Module } from '@nestjs/common';
import { ApiProfilesTechTeamApiControllerController } from './controllers/api-profiles-tech-team-api-controller.controller';
import { ApiProfilesTechTeamApiDto } from './dto/api-profiles-tech-team-api.dto';

@Module({
  controllers: [ApiProfilesTechTeamApiControllerController],
  providers: [],
  exports: [],
})
export class ApiProfilesTechTeamApiModule {}
