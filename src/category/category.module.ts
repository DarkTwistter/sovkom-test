import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryStorage } from "./categoryStorage";
import { CategoryController } from "./category.controller";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,
    {
      provide: 'CategoryStorage',
      useClass: CategoryStorage
    },
  ]
})
export class CategoryModule {}
