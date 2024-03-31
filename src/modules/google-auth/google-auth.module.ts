import { Module } from "@nestjs/common";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthSerivce } from "./google-auth.service";
import { GoogleStrategy } from "../../strategies/google.strategy";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthSerivce, GoogleStrategy, UserService],
})
export class GoogleAuthModule {}
