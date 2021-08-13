import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentials: AuthCredentials,
  ): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentials: AuthCredentials,
  ): Promise<{ accessToken }> {
    return this.authService.signIn(authCredentials);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user) {
    return { loginUser: user };
  }
}
