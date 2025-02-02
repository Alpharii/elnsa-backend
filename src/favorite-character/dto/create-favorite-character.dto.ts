import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFavoriteCharacterDto {
  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateFavoriteCharactersDto {
  @IsNotEmpty()
  personId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFavoriteCharacterDto)
  favorite_characters: CreateFavoriteCharacterDto[];
}
