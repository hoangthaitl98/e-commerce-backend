import { SignInDto } from "./dtos/signIn.dto";
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-in")
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password
    );
    return token;
  }

  @Get("me")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getMe(@Request() req) {
    console.log(req.user);

    return req.user;
  }
}
