import { Module } from '@nestjs/common';
import { ApiProfilesTechTeamApiControllerController } from './controllers/api-profiles-tech-team-api-controller.controller';
import { ApiProfilesTechTeamServiceModule } from '@grid-watch/api/profiles/tech-team/service';


@Module({
  controllers: [ApiProfilesTechTeamApiControllerController],
  imports: [ApiProfilesTechTeamServiceModule],
  providers: [],
  exports: [],
})
export class ApiProfilesTechTeamApiModule {}
