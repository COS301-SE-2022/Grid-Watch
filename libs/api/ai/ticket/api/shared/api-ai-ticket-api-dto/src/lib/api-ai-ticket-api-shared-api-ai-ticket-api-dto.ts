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
@IsNotEmpty()
aiData! : JSON;

@IsArray()
@IsNotEmpty()
aiTicketTypes! : string[];

@IsArray()
@IsNotEmpty()
aiTicketCities!  : string[];

@IsNumber()
@IsNotEmpty()
aiFitness! : number;
}