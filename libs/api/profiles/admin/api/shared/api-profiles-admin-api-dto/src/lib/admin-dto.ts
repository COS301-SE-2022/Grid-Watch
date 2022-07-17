import {
  IsNotEmpty,
  IsString, 
  IsEmail,
  IsAlphanumeric,
  IsArray,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class AdminDto {

@IsNumber()
@IsOptional()
id! : number;

@IsString()
@IsNotEmpty()
name! : string;

@IsEmail()
@IsNotEmpty()
email! : string;

@IsString()
@IsNotEmpty()
contactNumber! : string;

@IsArray()
@IsNotEmpty()
cities! : string[];

@IsAlphanumeric()
@IsNotEmpty()
password! : string;

@IsAlphanumeric()
@IsOptional()
passwordSalt! : string;

@IsDate()
@IsOptional()
dateCreated! : Date;
}
