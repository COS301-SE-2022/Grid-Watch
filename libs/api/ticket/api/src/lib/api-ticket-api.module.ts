import { Module } from '@nestjs/common';
import { ApiTicketServiceModule } from '@grid-watch/api/ticket/service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from './controllers/helper';
import { TicketController } from './controllers/api-ticket-api-controller.controller';

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
