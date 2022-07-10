import { ApiTicketApiModule } from '@grid-watch/api/ticket/api';
import { ApiProfilesTechTeamApiModule } from '@grid-watch/api/profiles/tech-team/api';
import { ApiProfilesPublicApiModule } from '@grid-watch/api/profiles/public/api';
import { Module } from '@nestjs/common';


@Module({
  imports: [ApiTicketApiModule,ApiProfilesTechTeamApiModule,ApiProfilesPublicApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
