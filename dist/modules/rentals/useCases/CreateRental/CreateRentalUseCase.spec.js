"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _DayJsDateprovider = require("@shared/container/providers/DateProvider/implementations/DayJsDateprovider");

var _AppError = require("@shared/errors/AppError");

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayJsDateprovider;
describe('Create Rental', () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayJsDateprovider = new _DayJsDateprovider.DayJsDateprovider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateprovider, carsRepositoryInMemory);
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test name car',
      description: 'Car test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand'
    });
    const rental = await createRentalUseCase.execute({
      user_id: '1123qwe',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '121212',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError('There is a rental in progress for user!'));
  });
  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '121213',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: '121213',
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError('Car is unavailable!'));
  });
  it('should not be able to create a new rental without the minimum 24 hours rental time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '1432qwe',
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError('Invalid return time! 24 hours minimum rental time.'));
  });
});