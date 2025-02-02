import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFavoriteCharacterDto } from './dto/update-favorite-character.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateFavoriteCharacterDto } from './dto/create-favorite-character.dto';

@Injectable()
export class FavoriteCharacterService {
  constructor(private prisma: PrismaService) {}

  async createMany(
    personId: number,
    favoriteCharacters: CreateFavoriteCharacterDto[],
  ) {
    // Cek apakah person dengan ID tersebut ada
    const person = await this.prisma.person.findUnique({
      where: { id: personId },
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    // Simpan semua karakter favorit dalam satu batch
    const createdCharacters = await this.prisma.favoriteCharacter.createMany({
      data: favoriteCharacters.map((character) => ({
        name: character.name,
        origin: character.origin,
        personId: person.id,
      })),
    });

    return createdCharacters;
  }

  async findAll() {
    return this.prisma.favoriteCharacter.findMany({
      include: { person: true },
    });
  }

  async findByPersonId(personId: number) {
    return this.prisma.favoriteCharacter.findMany({
      where: { personId },
      include: { person: true },
    });
  }

  async findOne(id: number) {
    const favoriteCharacter = await this.prisma.favoriteCharacter.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!favoriteCharacter)
      throw new NotFoundException('Favorite character not found');
    return favoriteCharacter;
  }

  async update(
    id: number,
    updateFavoriteCharacterDto: UpdateFavoriteCharacterDto,
  ) {
    const favoriteCharacter = await this.prisma.favoriteCharacter.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!favoriteCharacter)
      throw new NotFoundException('Favorite character not found');

    return this.prisma.favoriteCharacter.update({
      where: { id },
      data: updateFavoriteCharacterDto,
    });
  }

  async remove(id: number) {
    const favoriteCharacter = await this.prisma.favoriteCharacter.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!favoriteCharacter)
      throw new NotFoundException('Favorite character not found');
    return this.prisma.favoriteCharacter.delete({ where: { id } });
  }
}
