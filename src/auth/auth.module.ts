import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserReposetory } from './user.reposetory';

@Module({
  imports: [TypeOrmModule.forFeature([UserReposetory])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
