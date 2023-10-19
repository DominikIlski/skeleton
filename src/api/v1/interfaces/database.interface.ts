interface DatabaseCompatible<T> {
  create(item: T): Promise<T>;
  read(): Promise<T[] | null> 
  read(id: string): Promise<T | null> 
  read(id?: string): Promise<T[] | T | null> 
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<T | null>;
}

export default DatabaseCompatible;
