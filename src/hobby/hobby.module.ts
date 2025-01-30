import { Module } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { HobbyController } from './hobby.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Module({
  controllers: [HobbyController],
  providers: [HobbyService, PrismaService, JwtAuthGuard],
})
export class HobbyModule {}
