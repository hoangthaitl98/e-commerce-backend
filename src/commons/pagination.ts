import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class PaginationParam {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsOptional()
  size: number;
}
