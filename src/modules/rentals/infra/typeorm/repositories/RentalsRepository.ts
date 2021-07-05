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
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.ormRepository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.ormRepository.findOne(id);

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const user = await this.ormRepository.findOne({
      where: { user_id, end_date: null },
    });

    return user;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const car = await this.ormRepository.findOne({
      where: { car_id, end_date: null },
    });

    return car;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.ormRepository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentals;
  }
}

export { RentalsRepository };
