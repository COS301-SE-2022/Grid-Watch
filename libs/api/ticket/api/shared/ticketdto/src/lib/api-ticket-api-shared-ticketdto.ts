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
@IsNotEmpty()
ticketStreetAddress! : string;

@IsString()
@IsOptional()
ticketCity!  : string;

@IsString()
@IsOptional()
ticketLocation! : string;

@IsString()
@IsOptional()
ticketLong! : number;

@IsString()
@IsOptional()
ticketLat! : number;

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

@IsNumber()
@IsNotEmpty()
currentSubtask! : number;

@IsNumber()
@IsOptional()
userId! : number;

@IsString()
@IsNotEmpty()
ticketImg! : string;
}