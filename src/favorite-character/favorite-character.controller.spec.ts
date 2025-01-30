import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteCharacterController } from './favorite-character.controller';
import { FavoriteCharacterService } from './favorite-character.service';

describe('FavoriteCharacterController', () => {
  let controller: FavoriteCharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteCharacterController],
      providers: [FavoriteCharacterService],
    }).compile();

    controller = module.get<FavoriteCharacterController>(
      FavoriteCharacterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
