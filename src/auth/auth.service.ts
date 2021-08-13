import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth-credentials';
import { JwtPayload } from './jwtPayload.interface';
import { UserReposetory } from './user.reposetory';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserReposetory)
    private userReposetory: UserReposetory,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentials): Promise<void> {
    return this.userReposetory.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentials): Promise<{ accessToken }> {
    const username = await this.userReposetory.validateUserPassword(
      authCredentials,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
