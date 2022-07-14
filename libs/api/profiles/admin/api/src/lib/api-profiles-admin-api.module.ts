import { Module } from '@nestjs/common';
import { ApiProfilesAdminApiController } from './api-profiles-admin-api-controller.controller';

@Module({
  controllers: [ApiProfilesAdminApiController],
  providers: [],
  exports: [],
})
export class ApiProfilesAdminApiModule {}
