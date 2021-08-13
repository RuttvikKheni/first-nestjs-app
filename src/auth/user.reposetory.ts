import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bctypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentials } from './dto/auth-credentials';

@EntityRepository(User)
export class UserReposetory extends Repository<User> {
  async signUp(authCredentials: AuthCredentials): Promise<void> {
    const { username, password } = authCredentials;
    const user = new User();
    user.username = username;
    user.salt = await bctypt.genSalt();
    user.password = await this.hasPasswordGen(password, user.salt);
    try {
      await user.save();
    } catch ({ code }) {
      console.log(code);
      if (code === '23505')
        throw new ConflictException('username already exist!');
      else throw new InternalServerErrorException('username already used!');
    }
  }

  private async hasPasswordGen(
    password: string,
    salt: string,
  ): Promise<string> {
    return bctypt.hash(password, salt);
  }

  async validateUserPassword(
    authCredentials: AuthCredentials,
  ): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.findOne({ username });
    if (user && (await user.validatePasswor(password))) {
      return user.username;
    }
    return null;
  }
}
