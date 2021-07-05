import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    name,
    category_id,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAllAvailableCars({
    name,
    category,
    brand,
  }: IListCarsDTO): Promise<Car[]> {
    const cars = this.cars.filter(car => {
      if (
        car.available === true ||
        (name && car.name === name) ||
        (category && car.category.name === category) ||
        (brand && car.brand === brand)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id);

    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
