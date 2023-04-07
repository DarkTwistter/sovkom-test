import { Body, Controller, Delete, Get, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoryService } from './category.service';
import { CreateCategory } from './validations/createCategory';
import { ApiTags } from "@nestjs/swagger";
import { UpdateCategory } from "./validations/updateCategory";
import { DeleteCategory } from "./validations/deleteCategory";
import { FindCategories } from "./validations/findCategories";

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/createCategory')
  async createCategory(@Body() body: CreateCategory): Promise<object> {
    const result = await this.categoryService.createCategory(body);

    return result;
  }

  @Patch('/updateCategory')
  async updateCategory(@Body() body: UpdateCategory): Promise<object> {
    const result = await this.categoryService.updateCategory(body);

    return result;
  }

  @Delete('/deleteCategory')
  async deleteCategory(@Body() body: DeleteCategory): Promise<object> {
    const result = await this.categoryService.deleteCategory(body);

    return result;
  }

  @Get('/findCategories')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findCategories(@Query() query: FindCategories): Promise<object> {
    const result = await this.categoryService.findCategories(query);

    return result;
  }

}
