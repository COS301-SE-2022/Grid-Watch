import { Module } from '@nestjs/common';
import { ApiProfilesPublicService } from './api-profiles-public.service';
import {CreateUserHandler,DeleteUserHandler,UpdateUserEmailHandler,UpdateUserHandler,UpdateUserNameHandler,UpdateUserPasswordHandler,VerifyUserPasswordHandler,} from './commands/api-profiles-public-command-handler.handler'
import {GetUserEmailHandler,GetUserHandler,GetUserNameHandler} from './queries/api-profiles-public-query-handler.handler'
@Module({
  providers: [ApiProfilesPublicService,
              CreateUserHandler,
              DeleteUserHandler,
              UpdateUserEmailHandler,
              UpdateUserHandler,
              UpdateUserNameHandler,
              UpdateUserPasswordHandler,
              VerifyUserPasswordHandler,
              GetUserEmailHandler,
              GetUserHandler,
              GetUserNameHandler,
  ],
  exports: [ApiProfilesPublicService],
})
export class ApiProfilesPublicServiceModule {}
