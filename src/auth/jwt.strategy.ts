import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwtPayload.interface';
import { UserReposetory } from './user.reposetory';
import { User } from './user.entity';
import { get } from 'config';
const jwtConfig = get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userReposetory: UserReposetory) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userReposetory.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
