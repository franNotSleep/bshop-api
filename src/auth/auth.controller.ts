import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { RequestWithUser } from 'src/commons/types/req-with-user.type';
import { LocalGuard } from './guards/local.guard';
import { Public } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(@Req() req: RequestWithUser) {
    return req.user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.createUser(dto);
  }
}
