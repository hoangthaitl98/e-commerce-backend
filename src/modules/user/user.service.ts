import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { CreateUserDto } from "./dtos/createUser.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepo.save(dto);
    return user;
  }

  async getAllUser() {
    const users = await this.userRepo.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findBy({ id });
    return user;
  }
}
