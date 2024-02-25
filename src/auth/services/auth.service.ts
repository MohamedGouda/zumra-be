
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { SignInDto } from '../dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      return user;
    }
    return null;
  }

  async login(signinDto: SignInDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.validateUser(signinDto.username);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const accessToken = await this.jwtService.sign({
        username: user.username,
      });
      return { accessToken };
    } catch (err) {
      throw new Error('koko wawa');
    }
  }
}
