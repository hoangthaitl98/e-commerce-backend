import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./entities/user.entity";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GoogleAuthModule } from "./modules/google-auth/google-auth.module";
import { env } from "./env";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: env.database.host,
      port: 3306,
      username: env.database.username,
      password: env.database.password,
      database: env.database.dbName,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    GoogleAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
