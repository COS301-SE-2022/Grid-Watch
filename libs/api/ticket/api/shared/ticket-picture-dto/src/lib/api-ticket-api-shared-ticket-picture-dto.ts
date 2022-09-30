import {
  IsNotEmpty,
  IsNumber, 
  IsString, 
} from 'class-validator';

export class TicketPictureDto {
  
@IsNumber()
@IsNotEmpty()
pictureId! : number;

@IsString()
@IsNotEmpty()
pictureLink! : string;

@IsNumber()
@IsNotEmpty()
ticketId! : number;

}
