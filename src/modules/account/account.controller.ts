import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateAccountDto } from "./dtos/create-account.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("account")
@ApiTags("account")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AccountController {
  constructor(private accountSerivce: AccountService) {}

  @Get()
  async getAllAccount() {
    return this.accountSerivce.getAllAccount();
  }

  @Post()
  async createAccount(@Body() dto: CreateAccountDto) {
    return this.accountSerivce.createAccount(dto);
  }

  @Put(":id")
  async updateAccount(@Param("id") id: number, @Body() dto: CreateAccountDto) {
    return this.accountSerivce.updateAccount(id, dto);
  }

  @Delete(":id")
  async deleteAccount(@Param("id") id: number) {
    return this.accountSerivce.deleteAccount(id);
  }
}
