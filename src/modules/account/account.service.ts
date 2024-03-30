import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { Repository } from "typeorm";
import { CreateAccountDto } from "./dtos/create-account.dto";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly accountRepo: Repository<Account>
  ) {}

  async getAllAccount() {
    const accounts = await this.accountRepo.find({});
    return accounts;
  }

  async getUserByUsername(username: string) {
    const user = await this.accountRepo.findOne({ where: { username } });
    return user;
  }

  async createAccount(dto: CreateAccountDto) {
    const account = await this.accountRepo.save(dto);
    return account;
  }

  async updateAccount(id: number, dto: CreateAccountDto) {
    const account = await this.accountRepo.findOne({ where: { id } });
    if (!account) {
      throw new BadRequestException("Account not found");
    }
    return await this.accountRepo.update(id, dto);
  }

  async deleteAccount(id: number) {
    return await this.accountRepo.delete(id);
  }
}
