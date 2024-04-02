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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos/create-category.dts";

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async addCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.addCategory(dto);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateCategory(
    @Param("id") id: number,
    @Body() dto: CreateCategoryDto
  ) {
    return await this.categoryService.updateCategory(id, dto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteCategory(@Param("id") id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
