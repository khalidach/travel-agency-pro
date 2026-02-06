import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { agencyName, username, password } = loginDto;

    // 1. Find user by Agency AND Username
    const user = await this.prisma.user.findFirst({
      where: {
        agencyName,
        username,
      },
    });

    // 2. Validate User Existence and Active Status
    if (!user || !user.active) {
      throw new UnauthorizedException(
        'Invalid credentials or account inactive',
      );
    }

    // 3. Validate Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 4. Generate Token
    const payload = {
      sub: user.id,
      username: user.username,
      agency: user.agencyName,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        agencyName: user.agencyName,
      },
    };
  }

  // Temporary helper to register a user manually for testing
  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
