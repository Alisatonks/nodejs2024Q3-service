import {
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @Min(0, { message: 'Duration can not be less than 0' })
  @Max(10000, { message: 'Duration can not be less than 10000 sec' })
  duration: number;
}
