import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
