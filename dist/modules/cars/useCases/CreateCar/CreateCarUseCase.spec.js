"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepository;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepository);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand'
    });
    expect(car).toHaveProperty('id');
  });
  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car1',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand'
    });
    await expect(createCarUseCase.execute({
      name: 'Car2',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand'
    })).rejects.toEqual(new _AppError.AppError('There is already a car with this license plate.'));
  });
  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand'
    });
    expect(car.available).toBe(true);
  });
});