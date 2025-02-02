import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { FavoriteCharacterService } from './favorite-character.service';
import { UpdateFavoriteCharacterDto } from './dto/update-favorite-character.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateFavoriteCharactersDto } from './dto/create-favorite-character.dto';

@Controller('api/v1/favorite-characters')
export class FavoriteCharacterController {
  constructor(
    private readonly favoriteCharacterService: FavoriteCharacterService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateFavoriteCharactersDto) {
    const { personId, favorite_characters } = body;

    // Panggil service untuk menyimpan semua karakter favorit
    return this.favoriteCharacterService.createMany(
      personId,
      favorite_characters,
    );
  }

  @Get()
  findAll() {
    return this.favoriteCharacterService.findAll();
  }

  @Get('person/:id')
  findByPersonId(@Param('id') personId: string) {
    return this.favoriteCharacterService.findByPersonId(+personId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteCharacterService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateFavoriteCharacterDto: UpdateFavoriteCharacterDto,
  ) {
    return this.favoriteCharacterService.update(
      +id,
      updateFavoriteCharacterDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.favoriteCharacterService.remove(+id);
  }
}
