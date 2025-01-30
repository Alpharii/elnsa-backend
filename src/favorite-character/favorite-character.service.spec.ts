import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteCharacterService } from './favorite-character.service';

describe('FavoriteCharacterService', () => {
  let service: FavoriteCharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteCharacterService],
    }).compile();

    service = module.get<FavoriteCharacterService>(FavoriteCharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
