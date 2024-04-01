import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ProductImageService } from "./product-image.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("product-image")
@ApiTags("product-image")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  @Post("uploads")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor("files", 10, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, filename);
        },
      }),
    })
  )
  async uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.productImageService.uploadImage(files);
  }
}
