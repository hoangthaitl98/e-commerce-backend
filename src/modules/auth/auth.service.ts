import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "../account/account.service";

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string) {
    const account = await this.accountService.getUserByUsername(username);
    if (!account || account.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: account.id, username: username };
    return {
      acces_token: await this.jwtService.signAsync(payload),
    };
  }
}
