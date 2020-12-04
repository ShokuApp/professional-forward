export interface Repository<T> {
  get(id: string): Promise<T>;

  set(item: T): Promise<void>;

  list(): Promise<T[]>;
}
