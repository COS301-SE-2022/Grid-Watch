import { Module } from '@nestjs/common';
import { ApiAiNotificationsApiController } from './api-ai-notifications-api.controller';

@Module({
  controllers: [ApiAiNotificationsApiController],
  providers: [],
  exports: [],
})
export class ApiAiNotificationsApiModule {}
