import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFavoriteCharacterDto } from './dto/update-favorite-character.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteCharacterService {
  constructor(private prisma: PrismaService) {}

  async create(personId: number, name: string, origin: string) {
    const person = await this.prisma.person.findUnique({
      where: { id: personId },
    });
    if (!person) throw new NotFoundException('Person not found');

    return this.prisma.favoriteCharacter.create({
      data: {
        name,
        origin,
        person: { connect: { id: person.id } },
      },
    });
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
