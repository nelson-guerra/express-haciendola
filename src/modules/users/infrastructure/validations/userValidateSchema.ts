import { IsEmail, MinLength, IsNotEmpty, IsString, IsJWT } from 'class-validator';

export class CreateUserValidateSchema {
   @IsNotEmpty({ message: 'Name is required' })
   name: string;

   @MinLength(4, {
      message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
   })
   @IsString()
   @IsNotEmpty({ message: 'Password is required' })
   password: string;

   @IsEmail({}, { message: 'Email is invalid' })
   @IsNotEmpty({ message: 'Email is required' })
   email: string;
}

export class LoginValidateSchema {
   @IsEmail({}, { message: 'Email is invalid' })
   @IsNotEmpty({ message: 'Email is required' })
   email: string;

   @IsString()
   @IsNotEmpty({ message: 'Password is required' })
   password: string;
}

export class RefreshTokenValidateSchema {
   @IsJWT()
   @IsNotEmpty({ message: 'Access Denied. Refresh token is required' })
   token: string;
}
