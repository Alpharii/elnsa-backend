import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('api/v1/hobbies')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { personId: number; name: string }) {
    return this.hobbyService.create(body.personId, { name: body.name });
  }
  @Get()
  findAll() {
    return this.hobbyService.findAll();
  }

  @Get('person/:id')
  findByPersonId(@Param('id') personId: string) {
    return this.hobbyService.findByPersonId(+personId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbyService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHobbyDto: UpdateHobbyDto) {
    return this.hobbyService.update(+id, updateHobbyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbyService.remove(+id);
  }
}
