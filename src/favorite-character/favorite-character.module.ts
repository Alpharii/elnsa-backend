import { Module } from '@nestjs/common';
import { FavoriteCharacterService } from './favorite-character.service';
import { FavoriteCharacterController } from './favorite-character.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Module({
  controllers: [FavoriteCharacterController],
  providers: [FavoriteCharacterService, PrismaService, JwtAuthGuard],
})
export class FavoriteCharacterModule {}
