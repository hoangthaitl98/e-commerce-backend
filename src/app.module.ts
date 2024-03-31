import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./entities/user.entity";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GoogleAuthModule } from "./modules/google-auth/google-auth.module";
import { AccountModule } from "./modules/account/account.module";
import { ConfigModule } from "@nestjs/config";
import { Account } from "./entities/account.entity";
import { ProductImage } from "./entities/product-image.entity";
import { Product } from "./entities/product.entity";
import { ProductModule } from "./modules/product/product.module";
import { ProductImageModule } from "./modules/product-image/product-image.module";
import { CategoryModule } from "./modules/category/category.module";
import { Category } from "./entities/category.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      exclude: ["/api/(.*)"],
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [User, Account, Product, ProductImage, Category],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    GoogleAuthModule,
    AccountModule,
    ProductModule,
    ProductImageModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
