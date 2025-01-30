import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, PrismaService, JwtAuthGuard],
})
export class PersonsModule {}
