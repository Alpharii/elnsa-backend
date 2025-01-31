import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('api/v1/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `person-${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Request() req: any,
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const imageUrl = file ? `/public/${file.filename}` : null;
      const response = await this.personsService.createPerson(
        createPersonDto,
        imageUrl,
      );
      return response;
    } catch (error) {
      if (file) {
        try {
          const filePath = `./public/${file.filename}`;
          fs.unlinkSync(filePath);
        } catch (fsError) {
          console.log('Error while deleting file:', fsError);
        }
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `person-${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const imageUrl = file ? `/public/${file.filename}` : undefined;
      const response = await this.personsService.updatePerson(
        +id,
        updatePersonDto,
        imageUrl,
      );
      return response;
    } catch (error) {
      if (file) {
        try {
          const filePath = `./public/${file.filename}`;
          fs.unlinkSync(filePath);
        } catch (fsError) {
          console.log('Error while deleting file:', fsError);
        }
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.removePerson(+id);
  }
}
