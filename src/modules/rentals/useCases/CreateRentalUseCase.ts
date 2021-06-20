import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    // It should not be possible to register a new rental if one is already open for the same user
    const checkRentalOpenForUser =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (checkRentalOpenForUser) {
      throw new AppError('There is a rental in progress for user!');
    }

    // It should not be possible to register a new rental if one is already open for the same car
    const checkCarAvailability =
      await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (checkCarAvailability) {
      throw new AppError('Car is unavailable!');
    }

    // The rent must have a minimum duration of 24 hours
    const currentDate = this.dateProvider.currentDate();

    const compare = this.dateProvider.compareInHours(
      currentDate,
      expected_return_date,
    );

    const minimumRentalDuration = 24;

    if (compare < minimumRentalDuration) {
      throw new AppError('Invalid return time! 24 hours minimum rental time.');
    }

    // Create Rental
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
