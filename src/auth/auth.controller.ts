import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto } from './auth.dto';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginInputDto) {
    return this.authService.login(user.username, user.password);
  }

  @Post('register')
  async register(@Body() user: LoginInputDto) {
    return this.authService.register(user.username, user.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protected(@Request() req: any) {
    return {
      status: 200,
      message: 'Protected route',
      data: req.user,
    };
  }
}
