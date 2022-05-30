import {
    IsAlphanumeric,
    IsEmail,
    isNotEmpty,
    IsNotEmpty,
    IsNumber, 
    IsOptional, 
    IsPhoneNumber, 
    IsString, 
} from 'class-validator';

export class ApiProfilesTechTeamApiDto {

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
