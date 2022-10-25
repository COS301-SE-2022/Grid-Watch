import { JsonValue } from '@grid-watch/api/ticket/api/shared/ticketdto';
import {  IsDate, 
  IsNotEmpty,
  IsNumber, 
  IsOptional, 
  IsJSON,
  IsArray,
  isString,
  IsString,
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

@IsString()
@IsNotEmpty()
aiParameters! : string[];

@IsJSON()
@IsOptional()
aiArrays! : JsonValue;

@IsArray()
@IsNotEmpty()
aiTicketTypes! : string[];

@IsArray()
@IsNotEmpty()
aiTicketCities!  : string[];

@IsNumber()
@IsNotEmpty()
aiFitness! : number;

@IsString()
@IsNotEmpty()
aiType! : string;
}