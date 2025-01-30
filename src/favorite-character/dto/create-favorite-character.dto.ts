import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteCharacterDto {
  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
