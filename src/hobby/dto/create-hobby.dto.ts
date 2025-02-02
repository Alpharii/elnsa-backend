import { IsNumber, IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateHobbyDto {
  @IsNumber()
  personId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  hobbies: string[];
}
