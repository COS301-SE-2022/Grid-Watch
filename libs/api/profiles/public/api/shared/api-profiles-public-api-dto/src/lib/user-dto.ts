import {
  IsNotEmpty,
  IsString, 
  IsEmail,
  IsNumber,
  IsAlphanumeric,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';

export class UserDto {
@IsNumber()
@IsOptional()
id !: number;

@IsEmail()
@IsNotEmpty()
email! : string;

@IsAlphanumeric()
@IsNotEmpty()
password! : string;

@IsAlphanumeric()
@IsOptional()
passwordSalt! : string;

@IsString()
@IsNotEmpty()
name! : string;

@IsDate()
@IsNotEmpty()
dateCreated! : Date;

@IsArray()
@IsNotEmpty()
ticketsUpvoted! : number[];
}
