import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HobbyService {
  constructor(private prisma: PrismaService) {}

  async create(id: number, createHobbyDto: CreateHobbyDto) {
    const personId = await this.prisma.person.findUnique({
      where: { accountId: id },
    });
    return this.prisma.hobby.create({
      data: {
        ...createHobbyDto,
        person: { connect: { id: personId.id } },
      },
    });
  }

  async findAll() {
    return this.prisma.hobby.findMany({ include: { person: true } });
  }

  async findOne(id: number) {
    const hobby = await this.prisma.hobby.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!hobby) throw new NotFoundException('Hobby not found');
    return hobby;
  }

  async FindMyHobbies(id: number) {
    const personId = await this.prisma.person.findUnique({
      where: { accountId: id },
    });
    return this.prisma.hobby.findMany({
      where: { personId: personId.id },
      include: { person: true },
    });
  }

  async update(accountId: number, id: number, updateHobbyDto: UpdateHobbyDto) {
    const hobby = await this.prisma.hobby.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!hobby) throw new NotFoundException('Hobby not found');
    if (hobby.person.accountId !== accountId) {
      throw new ForbiddenException('You can only update your own hobbies');
    }
    return this.prisma.hobby.update({
      where: { id },
      data: updateHobbyDto,
    });
  }

  async remove(accountId: number, id: number) {
    const hobby = await this.prisma.hobby.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!hobby) throw new NotFoundException('Hobby not found');
    if (hobby.person.accountId !== accountId) {
      throw new ForbiddenException('You can only delete your own hobbies');
    }
    return this.prisma.hobby.delete({ where: { id } });
  }
}
