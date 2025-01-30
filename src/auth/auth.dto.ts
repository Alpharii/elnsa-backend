import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterInputDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class LoginInputDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
