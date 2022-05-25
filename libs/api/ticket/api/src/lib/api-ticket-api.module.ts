import { Module } from '@nestjs/common';
import { TicketController } from './controllers/api-ticket-api-controller.controller';
import { ApiTicketServiceModule } from '@grid-watch/api/ticket/service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from './controllers/helper';

const test = "test.jpg"
@Module({
  controllers: [TicketController],
  imports:[ApiTicketServiceModule, 
  // MulterModule.register({
  //   storage : diskStorage({
  //     destination : './libs/shared-assets/src/lib/uploadedFiles',
  //     filename : Helper.destinationPath
  //   })
  // })
],
  providers: [],
  exports: [],
})
export class ApiTicketApiModule {}
