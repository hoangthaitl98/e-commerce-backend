import { UserService } from '../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: username };
    return {
      acces_token: await this.jwtService.signAsync(payload),
    };
  }
}
