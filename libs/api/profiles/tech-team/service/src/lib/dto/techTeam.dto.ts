import { 
    IsDecimal, 
    IsNotEmpty,
    IsNumber, 
    IsOptional, 
    IsString, 
} from 'class-validator';

export class techTeamDto{

    @IsNumber()
    @IsNotEmpty()
    id : number;

    @IsString()
    @IsNotEmpty()
    name : string;


    @IsString()
    @IsOptional()
    email : string;

    @IsString()
    @IsNotEmpty()
    specialisation: string;

    @IsString()
    @IsNotEmpty()
    contact_number: string;

    @IsNumber()
    @IsNotEmpty()
    nr_jobs_completed: number;

    @IsDecimal()
    @IsOptional()
    rating_of_jobs: number;



}