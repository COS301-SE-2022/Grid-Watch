import { ApiTicketApiModule } from '@grid-watch/api/ticket/api';
import { ApiProfilesTechTeamApiModule } from '@grid-watch/api/profiles/tech-team/api';
import { Module } from '@nestjs/common';


@Module({
  imports: [ApiTicketApiModule,ApiProfilesTechTeamApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
