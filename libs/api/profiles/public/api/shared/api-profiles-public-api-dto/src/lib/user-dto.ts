import {
  IsNotEmpty,
  IsNumber, 
  IsOptional, 
  IsString, 
  IsEmail,
  IsPhoneNumber,
  IsAlphanumeric,
} from 'class-validator';

export class UserDto {

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
contactNumber!  : string;

@IsNumber()
@IsOptional()
nrJobsCompleted! : number;

@IsNumber()
@IsOptional()
ratingOfJobs! : number;

@IsAlphanumeric()
@IsNotEmpty()
password! : string;

}
