import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create-product.dto";
import { PaginationParam } from "src/commons/pagination";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("product")
@ApiTags("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("")
  async getAllProducts(@Query() pagination: PaginationParam) {
    return this.productService.getAllProduct(pagination);
  }

  @Get(":id")
  async getDetailProduct(@Param("id") id: number) {
    return this.productService.getDetailProduct(id);
  }

  @Get("/get-by-category/:categoryId")
  async getProductsByCategory(
    @Param("categoryId") categoryId: number,
    @Query() pagination: PaginationParam
  ) {
    return this.productService.getProductsByCategory(categoryId, pagination);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateProduct(@Param("id") id: number, @Body() dto: CreateProductDto) {}
}
