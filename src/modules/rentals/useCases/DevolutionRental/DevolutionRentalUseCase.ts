import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  rental_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    const currentDate = this.dateProvider.currentDate();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.currentDate(),
    );

    const minimum_daily_to_return = 1;

    if (daily <= 0) {
      daily = minimum_daily_to_return;
    }

    const delay = this.dateProvider.compareInDays(
      currentDate,
      rental.expected_return_date,
    );

    const car = await this.carsRepository.findById(rental.car_id);

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.currentDate();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
