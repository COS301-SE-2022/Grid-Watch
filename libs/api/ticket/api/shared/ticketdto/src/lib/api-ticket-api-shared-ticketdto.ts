import {  IsDate, 
  IsNotEmpty,
  IsNumber, 
  IsOptional, 
  IsString, 
} from 'class-validator';

export class TicketDto {

@IsNumber()
@IsOptional()
ticketId! : number;

@IsNumber()
@IsOptional()
assignedTechTeam! : number;

@IsString()
@IsNotEmpty()
ticketStatus! : string;

@IsDate()
@IsNotEmpty()
ticketCreateDate! : Date;

@IsDate()
@IsOptional()
ticketCloseDate! : Date;

@IsString()
@IsNotEmpty()
ticketType! : string;

@IsString()
@IsOptional()
ticketCity!  : string;

@IsString()
@IsNotEmpty()
ticketLocation! : string;

@IsNumber()
@IsNotEmpty()
ticketCost! : number;

@IsString()
@IsNotEmpty()
ticketDescription! : string;

@IsNumber()
@IsOptional()
ticketRepairTime! : number;

@IsNumber()
@IsNotEmpty()
ticketUpvotes! : number;



@IsString()
@IsNotEmpty()
ticketImg! : string;
}