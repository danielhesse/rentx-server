"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    category_id,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    specifications,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      specifications,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAllAvailableCars({
    name,
    category,
    brand
  }) {
    const cars = this.cars.filter(car => {
      if (car.available === true || name && car.name === name || category && car.category.name === category || brand && car.brand === brand) {
        return car;
      }

      return null;
    });
    return cars;
  }

  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;