import { Module } from '@nestjs/common';
import { ApiProfilesAdminService } from './api-profiles-admin-service.service';
import {GetAdminCellNrHandler,GetAdminCityHandler,GetAdminEmailHandler,GetAdminHandler,GetAdminNameHandler} from './queries/api-profiles-admin-query-handler.handler';
import {AddAdminCityHandler,CreateAdminHandler,DeleteAdminHandler,UpdateAdminCitiesHandler,UpdateAdminContactNrHandler,UpdateAdminEmailHandler,UpdateAdminHandler,UpdateAdminNameHandler,UpdateAdminPasswordHandler,VerifyAdminPasswordHandler} from './commands/api-profiles-admin-command-handler.handler';
@Module({
  controllers: [],
  providers: [ApiProfilesAdminService,
              GetAdminCellNrHandler,
              GetAdminCityHandler,
              GetAdminEmailHandler,
              GetAdminHandler,
              GetAdminNameHandler,
              AddAdminCityHandler,
              CreateAdminHandler,
              DeleteAdminHandler,
              UpdateAdminCitiesHandler,
              UpdateAdminContactNrHandler,
              UpdateAdminEmailHandler,
              UpdateAdminHandler,
              UpdateAdminNameHandler,
              UpdateAdminPasswordHandler,
              VerifyAdminPasswordHandler
  ],
  exports: [ApiProfilesAdminService],
})
export class ApiProfilesAdminServiceModule {}
