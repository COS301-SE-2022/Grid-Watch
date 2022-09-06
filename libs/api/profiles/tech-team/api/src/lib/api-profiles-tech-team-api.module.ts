import { Module } from '@nestjs/common';
import { ApiProfilesTechTeamApiControllerController } from './controllers/api-profiles-tech-team-api-controller.controller';
import { ApiProfilesTechTeamServiceModule } from '@grid-watch/api/profiles/tech-team/service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [ApiProfilesTechTeamApiControllerController],
  imports: [ApiProfilesTechTeamServiceModule,
    JwtModule.register({
      secret: 'testing',
      signOptions: { expiresIn: '50000s' },
    })],
  providers: [],
  exports: [],
})
export class ApiProfilesTechTeamApiModule {}
