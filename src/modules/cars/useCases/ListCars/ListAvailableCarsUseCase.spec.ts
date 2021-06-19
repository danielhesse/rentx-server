import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Available',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Available',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car Available',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Available',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category: 'category_id',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Available',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Brand' });

    expect(cars).toEqual([car]);
  });
});
