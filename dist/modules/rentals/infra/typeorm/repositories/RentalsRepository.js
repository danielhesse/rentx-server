"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total
  }) {
    const rental = this.ormRepository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total
    });
    await this.ormRepository.save(rental);
    return rental;
  }

  async findById(id) {
    const rental = await this.ormRepository.findOne(id);
    return rental;
  }

  async findOpenRentalByUser(user_id) {
    const user = await this.ormRepository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return user;
  }

  async findOpenRentalByCar(car_id) {
    const car = await this.ormRepository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return car;
  }

  async findByUser(user_id) {
    const rentals = await this.ormRepository.find({
      where: {
        user_id
      },
      relations: ['car']
    });
    return rentals;
  }

}

exports.RentalsRepository = RentalsRepository;