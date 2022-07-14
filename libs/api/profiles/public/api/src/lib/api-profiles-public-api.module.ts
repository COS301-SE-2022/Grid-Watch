import { Module } from '@nestjs/common';
import { ApiProfilesPublicApiController } from './controllers/api-profiles-public-api-controller.controller';
import { ApiProfilesPublicServiceModule } from '@grid-watch/api/profiles/public/service';

@Module({
  controllers: [ApiProfilesPublicApiController],
  imports:[ApiProfilesPublicServiceModule], 
  providers: [],
  exports: [],
})
export class ApiProfilesPublicApiModule {}
