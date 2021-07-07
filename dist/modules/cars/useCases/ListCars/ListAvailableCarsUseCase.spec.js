"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Available',
      category_id: 'category_id',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand'
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
      brand: 'Brand'
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car Available'
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
      brand: 'Brand'
    });
    const cars = await listAvailableCarsUseCase.execute({
      category: 'category_id'
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
      brand: 'Brand'
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand'
    });
    expect(cars).toEqual([car]);
  });
});