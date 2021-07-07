"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      name,
      category,
      brand
    } = request.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      name: name,
      category: category,
      brand: brand
    });
    return response.status(200).json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;