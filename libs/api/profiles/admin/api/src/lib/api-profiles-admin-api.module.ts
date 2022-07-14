import { Module } from '@nestjs/common';
import { ApiProfilesAdminApiController } from './api-profiles-admin-api-controller.controller';
import {ApiProfilesAdminServiceModule} from '@grid-watch/api/profiles/admin/service';
@Module({
  controllers: [ApiProfilesAdminApiController],
  imports: [ApiProfilesAdminServiceModule],
  providers: [],
  exports: [],
})
export class ApiProfilesAdminApiModule {}
