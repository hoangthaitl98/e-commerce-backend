import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("")
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(":id")
  async getUserById(@Param("id") id: number) {
    return this.userService.getUserById(id);
  }
}
