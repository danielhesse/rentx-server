"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("@modules/rentals/useCases/CreateRental/CreateRentalController");

var _DevolutionRentalController = require("@modules/rentals/useCases/DevolutionRental/DevolutionRentalController");

var _ListRentalsByUserController = require("@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
const createRentalsController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalsRoutes.use(_ensureAuthenticated.ensureAuthenticated);
rentalsRoutes.post('/', createRentalsController.handle);
rentalsRoutes.post('/devolution/:rental_id', devolutionRentalController.handle);
rentalsRoutes.get('/user', listRentalsByUserController.handle);