import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HobbyService {
  constructor(private prisma: PrismaService) {}

  async create(personId: number, createHobbyDto: CreateHobbyDto) {
    return this.prisma.hobby.create({
      data: {
        ...createHobbyDto,
        person: { connect: { id: personId } },
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

  async findByPersonId(personId: number) {
    return this.prisma.hobby.findMany({
      where: { personId },
      include: { person: true },
    });
  }

  async update(id: number, updateHobbyDto: UpdateHobbyDto) {
    const hobby = await this.prisma.hobby.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!hobby) throw new NotFoundException('Hobby not found');
    return this.prisma.hobby.update({
      where: { id },
      data: updateHobbyDto,
    });
  }

  async remove(id: number) {
    const hobby = await this.prisma.hobby.findUnique({
      where: { id },
      include: { person: true },
    });
    if (!hobby) throw new NotFoundException('Hobby not found');
    return this.prisma.hobby.delete({ where: { id } });
  }
}
