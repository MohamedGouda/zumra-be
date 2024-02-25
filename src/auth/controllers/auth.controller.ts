import { Controller, Post, Get, Body, HttpStatus, HttpException } from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    try {
      const user = await this.authService.login(signInDto);
      return { message: 'User signed in successfully', user };
    } catch (error) {
      throw new HttpException('sign in failed', HttpStatus.BAD_REQUEST);
    }
  }

}
