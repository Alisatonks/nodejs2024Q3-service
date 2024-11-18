import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 200)
  login: string;

  @IsString()
  @Length(1, 50)
  password: string;
}
