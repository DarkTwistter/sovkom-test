import { Inject, Injectable } from '@nestjs/common';
import { Category } from './models/Category';
import * as crypto from 'crypto';

@Injectable()
export class CategoryService {
  constructor(@Inject('CategoryStorage') private categoryStorage: any) {}

  async createCategory(body) {
    const uuid = crypto.randomUUID();

    const category = new Category({
      id: uuid,
      slug: body.slug,
      name: body.name,
      description: body.description,
      active: true,
      createdDate: null,
    });

    await this.categoryStorage.createCategory(category);

    return {
      status: 'Created',
      id: uuid,
    };
  }

  async updateCategory(body) {
    const category = new Category(body);

    await this.categoryStorage.updateCategory(category);

    return {
      status: 'Updated',
      id: category.id,
    };
  }

  async deleteCategory(body) {
    await this.categoryStorage.deleteCategory(body.id);

    return {
      status: 'Deleted',
      id: body.id,
    };
  }

  async findCategories(body) {
    const categories = await this.categoryStorage.findCategories(body);

    return categories;
  }
}
