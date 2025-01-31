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
import { CreateFavoriteCharacterDto } from './dto/create-favorite-character.dto';
import { UpdateFavoriteCharacterDto } from './dto/update-favorite-character.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('api/v1/favorite-characters')
export class FavoriteCharacterController {
  constructor(
    private readonly favoriteCharacterService: FavoriteCharacterService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: any,
    @Body() createFavoriteCharacterDto: CreateFavoriteCharacterDto,
  ) {
    return this.favoriteCharacterService.create(
      req.user.id,
      createFavoriteCharacterDto,
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
