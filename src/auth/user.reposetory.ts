import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentials } from './dto/auth-credentials';
import { User } from './user.entity';

@EntityRepository(User)
export class UserReposetory extends Repository<User> {
  async signUp(authCredentials: AuthCredentials): Promise<void> {
    const { username, password } = authCredentials;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
