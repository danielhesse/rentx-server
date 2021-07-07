"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

class CreateCarSpecificationController {
  async handle(request, response) {
    const {
      car_id
    } = request.params;
    const {
      specifications_id
    } = request.body;

    const createCarSpecificationUseCase = _tsyringe.container.resolve(_CreateCarSpecificationUseCase.CreateCarSpecificationUseCase);

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    });
    return response.status(200).json(carSpecification);
  }

}

exports.CreateCarSpecificationController = CreateCarSpecificationController;