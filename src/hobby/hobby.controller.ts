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
import { HobbyService } from './hobby.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('api/v1/hobbies')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbyService.create(req.user.id, createHobbyDto);
  }

  @Get()
  findAll() {
    return this.hobbyService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-hobbies')
  FindMyHobbies(@Request() req: any) {
    return this.hobbyService.FindMyHobbies(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbyService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateHobbyDto: UpdateHobbyDto,
  ) {
    return this.hobbyService.update(req.user.id, +id, updateHobbyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.hobbyService.remove(req.user.id, +id);
  }
}
