import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { PersonsModule } from './persons/persons.module';
import { HobbyModule } from './hobby/hobby.module';

@Module({
  imports: [AuthModule, PersonsModule, HobbyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
