import { Module } from '@nestjs/common';
import { ApiProfilesPublicApiController } from './controllers/api-profiles-public-api-controller.controller';

@Module({
  controllers: [ApiProfilesPublicApiController],
  imports:[], 
  providers: [],
  exports: [],
})
export class ApiProfilesPublicApiModule {}
