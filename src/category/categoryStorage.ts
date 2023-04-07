import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection, Knex } from 'nestjs-knex';
import { Category } from './models/Category';
import { FindCategories } from "./validations/findCategories";

@Injectable()
export class CategoryStorage {
  constructor(@InjectConnection() private knex: Knex) {}

  async createCategory(category: Category) {
    category.createdDate = Date.now();

    await this.knex('categories').insert(category);
  }

  async updateCategory(category: Category) {
    return this.knex('categories')
      .update({
        slug: category.slug,
        name: category.name,
        description: category.description,
        active: category.active,
      })
      .where({
        id: category.id,
      });
  }

  async deleteCategory(category_id: string) {
    return this.knex('categories').delete().where({
      id: category_id,
    });
  }

  // стандартный линтер делает некрасиво
  /* eslint-disable */
  async findCategories(searchParameters: FindCategories){

      return this.knex('categories')
      .modify(function(queryBuilder) {
        if (searchParameters.name && searchParameters.name.trim().length !== 0) {
          queryBuilder.whereILike('name', searchParameters.name.replace(/[её]/g, "['е'|'ё']"));
        }
        if (searchParameters.description && searchParameters.description.trim().length !== 0) {
          queryBuilder.whereILike('description', searchParameters.description.replace(/[её]/g, "['е'|'ё']"));
        }
        if (searchParameters.active != null) {

          queryBuilder.where('active', Boolean(searchParameters.active));
        }
        if (searchParameters.search && searchParameters.search.trim().length !== 0) {
          queryBuilder.whereILike('name', searchParameters.name.replace(/[её]/g, "['е'|'ё']"))
            .whereILike('description', searchParameters.description.replace(/[её]/g, "['е'|'ё']"))
        }
        if (searchParameters.sort && searchParameters.search.trim().length !== 0) {

          const matches = searchParameters.sort.match(/^(-)?(.+)/); // регулярка заберет - из сортировки и само название
          if (!matches) {
            throw new HttpException('Invalid sorting query', HttpStatus.BAD_REQUEST)
          }


          const sortType = matches[1] ? 'DESC' : 'ASC';

          const sortFieldName = matches[2];

          const category = new Category({});

          if(!Object.keys(category).includes(sortFieldName)){
            throw new HttpException('Invalid sorting field name', HttpStatus.BAD_REQUEST);
          }

          queryBuilder.orderBy(sortFieldName, sortType);
        }

        if(searchParameters.page && searchParameters.pageSize){

          const offset = Math.max(0, (searchParameters.page - 1) * searchParameters.pageSize);
          queryBuilder.limit(searchParameters.pageSize)
            .offset(offset)
        }
      });
  }
  /* eslint-enable */
}
