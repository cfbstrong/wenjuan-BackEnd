import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
// import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // 装饰器，表示这个路由不需要认证
  @Post('login')
  async login(@Body() userInfo: CreateUserDto) {
    const { username, password } = userInfo;
    return await this.authService.signIn(username, password);
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // request['user'] = payload;
    return req.user;
  }
}
