import {
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsNumber()
  @Min(1900, { message: 'Year cannot be earlier than 1900' })
  @Max(new Date().getFullYear(), { message: 'Year cannot be in the future' })
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
