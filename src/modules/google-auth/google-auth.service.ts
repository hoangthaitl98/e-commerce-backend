import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class GoogleAuthSerivce {
  constructor(private userService: UserService) {}

  googleLogin(req) {
    if (!req.user) {
      return "No user from google";
    }
    const user = this.userService.createUser({
      email: req.user.email,
      password: "",
    });
    return user;
  }
}
