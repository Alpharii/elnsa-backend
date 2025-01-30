import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AesService } from './aes.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly aesService: AesService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.account.findUnique({
      where: { username },
    });

    if (!user) return null;

    const decryptedPassword = this.aesService.decrypt(
      user.password,
      process.env.AES_SECRET,
    );

    if (decryptedPassword !== password) return null;

    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }

    return {
      status: 'success',
      message: 'Login successful',
      access_token: this.jwtService.sign({ id: user.id, username }),
    };
  }

  async register(username: string, password: string) {
    const existingUser = await this.prismaService.account.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }

    const encryptedPassword = this.aesService.encrypt(
      password,
      process.env.AES_SECRET,
    );

    await this.prismaService.account.create({
      data: { username, password: encryptedPassword },
    });

    return {
      status: 'success',
      message: 'Account created',
    };
  }
}
