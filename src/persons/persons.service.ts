import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

  async createPerson(createPersonDto: CreatePersonDto, imageUrl?: string) {
    try {
      return this.prisma.person.create({
        data: {
          ...createPersonDto,
          picture: imageUrl,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
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

  async updatePerson(
    id: number,
    updatePersonDto: UpdatePersonDto,
    imageUrl?: string,
  ) {
    const existingPerson = await this.prisma.person.findUnique({
      where: { id },
    });

    if (!existingPerson) {
      throw new ConflictException('Person not found');
    }

    return this.prisma.person.update({
      where: { id },
      data: {
        ...updatePersonDto,
        picture: imageUrl ?? existingPerson.picture,
      },
    });
  }

  async removePerson(id: number) {
    const existingPerson = await this.prisma.person.findUnique({
      where: { id },
    });

    if (!existingPerson) {
      throw new ConflictException('Person not found');
    }

    return this.prisma.person.delete({
      where: { id },
    });
  }
}
