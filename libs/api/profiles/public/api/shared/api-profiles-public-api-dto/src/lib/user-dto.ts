import {
  IsNotEmpty,
  IsString, 
  IsEmail,
  IsNumber,
  IsAlphanumeric,
  IsDate,
  IsOptional,
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
created! : Date;


}
