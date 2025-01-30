import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteCharacterDto } from './dto/create-favorite-character.dto';
import { UpdateFavoriteCharacterDto } from './dto/update-favorite-character.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteCharacterService {
  constructor(private prisma: PrismaService) {}

  async create(
    accountId: number,
    createFavoriteCharacterDto: CreateFavoriteCharacterDto,
  ) {
    const person = await this.prisma.person.findUnique({
      where: { accountId },
    });
    if (!person) throw new NotFoundException('Person not found');

    return this.prisma.favoriteCharacter.create({
      data: {
        ...createFavoriteCharacterDto,
        person: { connect: { id: person.id } },
      },
    });
  }

  async findAll() {
    return this.prisma.favoriteCharacter.findMany({
      include: { person: true },
    });
  }

  async findMyFavoriteCharacters(accountId: number) {
    const person = await this.prisma.person.findUnique({
      where: { accountId },
    });
    if (!person) throw new NotFoundException('Person not found');

    return this.prisma.favoriteCharacter.findMany({
      where: { personId: person.id },
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
    accountId: number,
    id: number,
    updateFavoriteCharacterDto: UpdateFavoriteCharacterDto,
  ) {
    const favoriteCharacter = await this.prisma.favoriteCharacter.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!favoriteCharacter)
      throw new NotFoundException('Favorite character not found');
    if (favoriteCharacter.person.accountId !== accountId) {
      throw new ForbiddenException(
        'You can only update your own favorite characters',
      );
    }

    return this.prisma.favoriteCharacter.update({
      where: { id },
      data: updateFavoriteCharacterDto,
    });
  }

  async remove(accountId: number, id: number) {
    const favoriteCharacter = await this.prisma.favoriteCharacter.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!favoriteCharacter)
      throw new NotFoundException('Favorite character not found');
    if (favoriteCharacter.person.accountId !== accountId) {
      throw new ForbiddenException(
        'You can only delete your own favorite characters',
      );
    }
    return this.prisma.favoriteCharacter.delete({ where: { id } });
  }
}
