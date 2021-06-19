import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async create({
    name,
    category_id,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });

    await this.ormRepository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.ormRepository.findOne({ license_plate });

    return car;
  }

  async findAllAvailableCars({
    name,
    category,
    brand,
  }: IListCarsDTO): Promise<Car[]> {
    // Alias c = car
    const carsQuery = await this.ormRepository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (category) {
      carsQuery.andWhere('c.category = :category', { category });
    }

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository };
