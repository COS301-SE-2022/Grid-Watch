import { Module } from '@nestjs/common';
import { ApiProfilesTechTeamApiControllerController } from './controllers/api-profiles-tech-team-api-controller.controller';
import { ApiProfilesAdminServiceModule } from '@grid-watch/api/profiles/admin/service';


@Module({
  controllers: [ApiProfilesTechTeamApiControllerController],
  imports: [ApiProfilesAdminServiceModule],
  providers: [],
  exports: [],
})
export class ApiProfilesTechTeamApiModule {}
