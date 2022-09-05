import { Module } from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import { ApiProfilesPublicService } from './api-profiles-public.service';
import {AddTicketUpvotedHandler,CreateUserHandler,DeleteUserHandler,UpdateUserEmailHandler,UpdateUserHandler,UpdateUserNameHandler,UpdateUserPasswordHandler,VerifyUserPasswordHandler,UpdateUserRatingHandler,ResetUserRatingHandler} from './commands/api-profiles-public-command-handler.handler'
import {GetUserEmailHandler,GetUserHandler,GetUserNameHandler} from './queries/api-profiles-public-query-handler.handler'
import { ApiProfilesPublicRepositoryDataAccess } from '@grid-watch/api/profiles/public/repository';
@Module({
  imports: [CqrsModule],
  providers: [ApiProfilesPublicService,
              ApiProfilesPublicRepositoryDataAccess,
              CreateUserHandler,
              AddTicketUpvotedHandler,
              DeleteUserHandler,
              UpdateUserEmailHandler,
              UpdateUserHandler,
              UpdateUserNameHandler,
              UpdateUserPasswordHandler,
              UpdateUserRatingHandler,
              ResetUserRatingHandler,
              VerifyUserPasswordHandler,
              GetUserEmailHandler,
              GetUserHandler,
              GetUserNameHandler,
  ],
  exports: [ApiProfilesPublicService],
})
export class ApiProfilesPublicServiceModule {}
