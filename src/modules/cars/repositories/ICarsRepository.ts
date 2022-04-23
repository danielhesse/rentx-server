import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IListCarsDTO } from '../dtos/IListCarsDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailableCars({ name, category, brand }: IListCarsDTO): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
