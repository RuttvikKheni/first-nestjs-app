import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth-credentials';
import { UserReposetory } from './user.reposetory';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserReposetory)
    private userReposetory: UserReposetory,
  ) {}

  async signUp(authCredentials: AuthCredentials): Promise<void> {
    this.userReposetory.signUp(authCredentials);
  }
}
