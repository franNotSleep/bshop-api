import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from 'src/configuration/configuration.type';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigurationType>,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException(`Invalid credentials`);
    }

    const ok = await this.passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!ok) {
      throw new BadRequestException(`Invalid credentials`);
    }

    return this.generateTokens({ userId: user.id });
  }

  async refreshToken(userId: number) {
    return this.generateTokens({ userId });
  }

  async createUser(dto: SignUpDto) {
    const exists = await this.userService.findByEmail(dto.email);
    if (exists) {
      throw new BadRequestException(`Email ${exists.email} already exists.`);
    }

    const password = await this.passwordService.hashPassword(dto.password);
    const userId = await this.userService.create({
      ...dto,
      password,
    });

    return this.generateTokens({ userId });
  }

  private generateTokens(payload: { userId: number }) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: number }) {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: number }) {
    const secret = this.configService.get('auth.jwtRefreshSecret', {
      infer: true,
    });
    const expiresIn = this.configService.get('auth.jwtRefreshExpirationTime', {
      infer: true,
    });

    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
