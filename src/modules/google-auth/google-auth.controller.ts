import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GoogleAuthSerivce } from "./google-auth.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("google-auth")
@ApiTags("google-auth")
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthSerivce) {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    return "OK";
  }

  @Get("auth/google/redirect")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req) {
    return this.googleAuthService.googleLogin(req);
  }
}
