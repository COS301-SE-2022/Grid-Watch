import { ApiTicketApiModule } from '@grid-watch/api/ticket/api';
import { ApiProfilesTechTeamApiModule } from '@grid-watch/api/profiles/tech-team/api';
import { ApiProfilesPublicApiModule } from '@grid-watch/api/profiles/public/api';
import { ApiProfilesAdminApiModule } from '@grid-watch/api/profiles/admin/api';
import { ApiAiAdminApiModule} from '@grid-watch/api/ai/admin/api';
import {ApiAiTicketApiModule} from '@grid-watch/api/ai/ticket/api';
import {ApiAiNotificationsApiModule} from '@grid-watch/api/ai/notifications/api';
import { Module } from '@nestjs/common';


@Module({
  imports: [ApiTicketApiModule,ApiProfilesTechTeamApiModule,ApiProfilesPublicApiModule,ApiProfilesAdminApiModule,ApiAiAdminApiModule,ApiAiTicketApiModule,ApiAiNotificationsApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
