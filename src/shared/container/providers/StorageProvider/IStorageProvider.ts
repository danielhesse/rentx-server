import { IStorageDTO } from './dtos/IStorageDTO';

interface IStorageProvider {
  save({ file, folder }: IStorageDTO): Promise<string>;
  delete({ file, folder }: IStorageDTO): Promise<void>;
}

export { IStorageProvider };
