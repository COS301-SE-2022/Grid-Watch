import {
  IsNotEmpty,
  IsString, 
  IsEmail,
  IsAlphanumeric,
  //IsDate,
  IsArray,
} from 'class-validator';

export class AdminDto {
@IsString()
@IsNotEmpty()
name! : string;

@IsEmail()
@IsNotEmpty()
email! : string;

@IsString()
@IsNotEmpty()
contactNr! : string;

@IsArray()
@IsNotEmpty()
cities! : string[];

@IsAlphanumeric()
@IsNotEmpty()
password! : string;

// @IsDate()
// @IsNotEmpty()
// dateCreated! : Date;
}
