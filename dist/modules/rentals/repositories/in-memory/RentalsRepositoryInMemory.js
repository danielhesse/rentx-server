"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _Rental = require("@modules/rentals/infra/typeorm/entities/Rental");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async create({
    user_id,
    car_id,
    expected_return_date
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      start_date: new Date(),
      expected_return_date
    });
    this.rentals.push(rental);
    return rental;
  }

  async findById(id) {
    return this.rentals.find(rental => rental.id === id);
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async findOpenRentalByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findByUser(user_id) {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;