import { ApiTicketApiModule } from '@grid-watch/api/ticket/api';
import { ApiProfilesTechTeamApiModule } from '@grid-watch/api/profiles/tech-team/api';
import { ApiProfilesPublicApiModule } from '@grid-watch/api/profiles/public/api';
import { ApiProfilesAdminApiModule } from '@grid-watch/api/profiles/admin/api';
import {ApiAiTicketApiModule} from '@grid-watch/api/ai/ticket/api';
import { Module } from '@nestjs/common';


@Module({
  imports: [ApiTicketApiModule,ApiProfilesTechTeamApiModule,ApiProfilesPublicApiModule,ApiProfilesAdminApiModule,ApiAiTicketApiModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
