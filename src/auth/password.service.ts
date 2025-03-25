import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}

  hashPassword(pwd: string) {
    const saltRounds = this.configService.get('auth.saltRounds', {
      infer: true,
    });
    return hash(pwd, saltRounds);
  }

  comparePassword(pwd: string, hash: string) {
    return compare(pwd, hash);
  }
}
