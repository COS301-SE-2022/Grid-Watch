import {
  IsNotEmpty,
  IsNumber, 
  IsOptional, 
  IsString, 
  IsEmail,
  IsPhoneNumber,
  IsAlphanumeric,
  IsDate,
  IsArray,
} from 'class-validator';

export class TechTeamDto {

@IsAlphanumeric()
@IsNotEmpty()
id! : number;

@IsString()
@IsNotEmpty()
name! : string;

@IsEmail()
@IsOptional()
email! : string;

@IsString()
@IsNotEmpty()
specialisation! : string[];

@IsPhoneNumber()
@IsNotEmpty()
contactNumber!  : string;

@IsArray()
@IsNotEmpty()
cities!  : string[];

@IsNumber()
@IsOptional()
nrJobsCompleted! : number;

@IsNumber()
@IsOptional()
ratingOfJobs! : number;

@IsAlphanumeric()
@IsNotEmpty()
password! : string;

@IsAlphanumeric()
@IsNotEmpty()
passwordSalt! : string;

@IsDate()
@IsOptional()
dateCreated! : Date;

}
