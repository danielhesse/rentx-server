"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Car.Car);
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
    const car = this.ormRepository.create({
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
    await this.ormRepository.save(car);
    return car;
  }

  async findById(id) {
    const car = await this.ormRepository.findOne(id);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.ormRepository.findOne({
      license_plate
    });
    return car;
  }

  async findAllAvailableCars({
    name,
    category,
    brand
  }) {
    // Alias c = car
    const carsQuery = await this.ormRepository.createQueryBuilder('c').where('available = :available', {
      available: true
    });

    if (name) {
      carsQuery.andWhere('c.name = :name', {
        name
      });
    }

    if (category) {
      carsQuery.andWhere('c.category = :category', {
        category
      });
    }

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', {
        brand
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async updateAvailable(id, available) {
    await this.ormRepository.createQueryBuilder().update().set({
      available
    }).where('id = :id').setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;