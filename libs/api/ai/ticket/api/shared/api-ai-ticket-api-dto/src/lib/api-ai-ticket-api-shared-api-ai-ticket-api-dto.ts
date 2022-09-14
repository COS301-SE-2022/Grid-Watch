import { JsonValue } from '@grid-watch/api/ticket/api/shared/ticketdto';
import {  IsDate, 
  IsNotEmpty,
  IsNumber, 
  IsOptional, 
  IsJSON,
  IsArray,
} from 'class-validator';

export class AiDto {

@IsNumber()
@IsOptional()
aiId! : number;

@IsDate()
@IsOptional()
dateCreated! : Date;

@IsJSON()
@IsOptional()
aiData! : JsonValue;

@IsArray()
@IsNotEmpty()
aiTicketTypes! : string[]|number[]|Date[];

@IsArray()
@IsNotEmpty()
aiTicketCities!  : string[]|number[]|Date[];

@IsNumber()
@IsNotEmpty()
aiFitness! : number;
}