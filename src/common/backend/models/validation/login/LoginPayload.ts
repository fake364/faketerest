import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginRequestPayload {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
