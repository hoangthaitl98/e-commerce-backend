import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(username: string, password: string) {
    const user = this.repo.create({ username, password });
    await this.repo.insert(user);
    return user;
  }

  async getAllUser() {
    const users = await this.repo.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.repo.findBy({ id: id.toString() });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.repo.findOne({ where: { username } });
    return user;
  }
}
