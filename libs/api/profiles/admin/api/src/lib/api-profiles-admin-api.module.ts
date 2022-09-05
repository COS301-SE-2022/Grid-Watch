import { Module } from '@nestjs/common';
import { ApiProfilesAdminApiController } from './api-profiles-admin-api-controller.controller';
import {ApiProfilesAdminServiceModule} from '@grid-watch/api/profiles/admin/service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  controllers: [ApiProfilesAdminApiController],
  imports: [ApiProfilesAdminServiceModule,
    PassportModule,
    JwtModule.register({
      secret: 'testing',
      signOptions: { expiresIn: '50000s' },
    }),
  ],
  providers: [],
  exports: [],
})
export class ApiProfilesAdminApiModule {}
