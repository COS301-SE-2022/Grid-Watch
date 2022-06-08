import {
  IsNotEmpty,
  IsNumber, 
  IsString, 
} from 'class-validator';

export class TicketPictureDto {
  
@IsNumber()
@IsNotEmpty()
picture_id! : number;

@IsString()
@IsNotEmpty()
picture_link! : string;

@IsNumber()
@IsNotEmpty()
ticket_id! : number;

}
