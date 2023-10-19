export interface IBasicService<T> {
  create(data: T): Promise<T>;
  findOne(id: string): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  update(id: string, data: T): Promise<T | null>;
  deleteOne(id: string): Promise<T | null>;
}

