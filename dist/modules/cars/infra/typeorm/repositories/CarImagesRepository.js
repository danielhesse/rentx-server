"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarImagesRepository = void 0;

var _typeorm = require("typeorm");

var _CarImage = require("../entities/CarImage");

class CarImagesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_CarImage.CarImage);
  }

  async create({
    car_id,
    image_name
  }) {
    const carImage = this.ormRepository.create({
      car_id,
      image_name
    });
    await this.ormRepository.save(carImage);
    return carImage;
  }

}

exports.CarImagesRepository = CarImagesRepository;