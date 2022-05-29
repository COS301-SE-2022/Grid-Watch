import {  IsDate, 
  IsNotEmpty,
  IsNumber, 
  IsOptional, 
  IsString, 
} from 'class-validator';

export class TicketDto {
@IsString()
@IsNotEmpty()
ticket_status! : string;

@IsDate()
@IsNotEmpty()
ticket_create_date! : Date;

@IsDate()
@IsOptional()
ticket_close_date! : Date;

@IsString()
@IsNotEmpty()
ticket_type! : string;

@IsString()
@IsOptional()
ticket_city!  : string;

@IsString()
@IsNotEmpty()
ticket_location! : string;

@IsNumber()
@IsNotEmpty()
ticket_cost! : number;

@IsString()
@IsNotEmpty()
ticket_description! : string;

@IsNumber()
@IsOptional()
ticket_repair_time! : number;

@IsNumber()
@IsNotEmpty()
ticket_upvotes! : number;

@IsNumber()
@IsNotEmpty()
ticket_id! : number;
}