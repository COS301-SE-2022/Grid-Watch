import {
  IsNotEmpty,
  IsNumber, 
  IsOptional, 
  IsString, 
  IsEmail,
  IsPhoneNumber,
  IsAlphanumeric,
} from 'class-validator';

export class techTeamDto {

@IsString()
@IsNotEmpty()
name! : string;

@IsEmail()
@IsOptional()
email! : string;

@IsString()
@IsNotEmpty()
specialisation! : string;

@IsPhoneNumber()
@IsNotEmpty()
contact_number!  : string;

@IsNumber()
@IsOptional()
nr_jobs_completed! : number;

@IsNumber()
@IsOptional()
rating_of_jobs! : number;

@IsAlphanumeric()
@IsNotEmpty()
password! : string;

}
