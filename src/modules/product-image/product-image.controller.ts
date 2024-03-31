import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ProductImageService } from "./product-image.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("product-image")
@ApiTags("product-image")
export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  @Post("/:productId/uploads")
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
  async uploadImage(
    @Param("productId") productId: number,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.productImageService.uploadImage(productId, files);
  }
}
