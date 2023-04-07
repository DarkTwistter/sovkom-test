export class Category {

  constructor({id = null, slug = null, name = null, description = null, active = null, createdDate = null}) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.active = active;
    this.createdDate = createdDate;
  }
  id: string;
  slug: string;
  name: string;
  description: string;
  createdDate: number;
  active: boolean;
}
