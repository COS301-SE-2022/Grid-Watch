import {
  IsNotEmpty,
  IsString, 
  IsEmail,
  IsAlphanumeric,
  IsDate,
} from 'class-validator';

export class UserDto {

@IsEmail()
@IsNotEmpty()
email! : string;

@IsAlphanumeric()
@IsNotEmpty()
password! : string;

@IsString()
@IsNotEmpty()
name! : string;

@IsDate()
@IsNotEmpty()
dateCreated! : Date;
}
