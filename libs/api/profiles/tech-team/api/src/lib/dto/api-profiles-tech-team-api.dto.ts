import {
    IsNotEmpty,
    IsNumber, 
    IsOptional, 
    IsString, 
} from 'class-validator';

export class ApiProfilesTechTeamApiDto {

@IsString()
@IsNotEmpty()
name! : string;

@IsString()
@IsOptional()
email! : string;

@IsString()
@IsNotEmpty()
specialisation! : string;

@IsNumber()
@IsNotEmpty()
contact_number!  : number;

@IsNumber()
@IsOptional()
nr_jobs_completed! : number;

@IsNumber()
@IsOptional()
rating_of_jobs! : number;
}
