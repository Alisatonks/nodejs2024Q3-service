import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @Length(1, 50)
  oldPassword: string;

  @IsString()
  @Length(1, 50)
  newPassword: string;
}
