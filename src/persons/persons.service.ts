import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

  async createSelf(accountId: number, createPersonDto: CreatePersonDto) {
    const existingPerson = await this.prisma.person.findUnique({
      where: { accountId },
    });

    if (existingPerson) {
      throw new ConflictException('User already has a person profile');
    }

    return this.prisma.person.create({
      data: {
        ...createPersonDto,
        account: {
          connect: { id: accountId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.person.findMany();
  }

  async findOne(id: number) {
    const person = await this.prisma.person.findUnique({
      where: { id },
    });

    if (!person) {
      throw new ConflictException('Person not found');
    }

    return person;
  }

  async updateSelf(accountId: number, updatePersonDto: UpdatePersonDto) {
    const existingPerson = await this.prisma.person.findUnique({
      where: { accountId },
    });

    if (!existingPerson) {
      throw new ConflictException('User does not have a person profile');
    }
    return this.prisma.person.update({
      where: { accountId },
      data: updatePersonDto,
    });
  }

  async removeSelf(accountId: number) {
    const existingPerson = await this.prisma.person.findUnique({
      where: { accountId },
    });

    if (!existingPerson) {
      throw new ConflictException('User does not have a person profile');
    }

    return this.prisma.person.delete({
      where: { accountId },
    });
  }
}
