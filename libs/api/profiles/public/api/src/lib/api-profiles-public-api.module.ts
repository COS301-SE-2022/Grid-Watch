import { Module } from '@nestjs/common';
import { ApiProfilesPublicApiController } from './controllers/api-profiles-public-api-controller.controller';
import { ApiProfilesPublicServiceModule } from '@grid-watch/api/profiles/public/service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@grid-watch/api/authentication';

@Module({
  controllers: [ApiProfilesPublicApiController],
  imports: [
    ApiProfilesPublicServiceModule,
    PassportModule,
    JwtModule.register({
      secret: 'testing',
      signOptions: { expiresIn: '50000s' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class ApiProfilesPublicApiModule {}
