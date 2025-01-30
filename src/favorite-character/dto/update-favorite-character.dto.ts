import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteCharacterDto } from './create-favorite-character.dto';

export class UpdateFavoriteCharacterDto extends PartialType(
  CreateFavoriteCharacterDto,
) {}
