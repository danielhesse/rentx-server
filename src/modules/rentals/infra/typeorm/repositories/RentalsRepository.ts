import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.ormRepository.save(rental);

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const user = await this.ormRepository.findOne({ user_id });

    return user;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const car = await this.ormRepository.findOne({ car_id });

    return car;
  }
}

export { RentalsRepository };
