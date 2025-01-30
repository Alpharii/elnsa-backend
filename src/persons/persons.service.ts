import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

  async createPerson(
    accountId: number,
    createPersonDto: CreatePersonDto,
    imageUrl?: string,
  ) {
    const existingPerson = await this.prisma.person.findUnique({
      where: { accountId },
    });

    if (existingPerson) {
      throw new HttpException(
        'User already has a person profile',
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.person.create({
      data: {
        ...createPersonDto,
        picture: imageUrl,
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

  async updateSelf(
    accountId: number,
    updatePersonDto: UpdatePersonDto,
    imageUrl?: string,
  ) {
    const existingPerson = await this.prisma.person.findUnique({
      where: { accountId },
    });

    if (!existingPerson) {
      throw new HttpException(
        'User does not have a person profile',
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.person.update({
      where: { accountId },
      data: {
        ...updatePersonDto,
        ...(imageUrl && { picture: imageUrl }),
      },
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
