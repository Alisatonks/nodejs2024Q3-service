import { IsString, Length, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @Length(1, 200)
  name: string | null;

  @IsBoolean()
  grammy: boolean;
}
