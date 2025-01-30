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
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('api/v1/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createPersonDto: CreatePersonDto) {
    const accountId = req.user.id;
    return this.personsService.createSelf(accountId, createPersonDto);
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
  @Patch()
  update(@Request() req: any, @Body() updatePersonDto: UpdatePersonDto) {
    const accountId = req.user.id;
    return this.personsService.updateSelf(accountId, updatePersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req: any) {
    const accountId = req.user.id;
    console.log(accountId);
    return this.personsService.removeSelf(accountId);
  }
}
