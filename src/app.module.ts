import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { PersonsModule } from './persons/persons.module';
import { HobbyModule } from './hobby/hobby.module';
import { FavoriteCharacterModule } from './favorite-character/favorite-character.module';

@Module({
  imports: [AuthModule, PersonsModule, HobbyModule, FavoriteCharacterModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
