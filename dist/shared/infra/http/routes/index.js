"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _password = require("./password.routes");

var _rentals = require("./rentals.routes");

var _sessions = require("./sessions.routes");

var _specifications = require("./specifications.routes");

var _users = require("./users.routes");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use('/categories', _categories.categoriesRoutes);
routes.use('/specifications', _specifications.specificationsRoutes);
routes.use('/users', _users.usersRoutes);
routes.use('/cars', _cars.carsRoutes);
routes.use('/rentals', _rentals.rentalsRoutes);
routes.use('/sessions', _sessions.sessionsRoutes);
routes.use('/', _password.passwordRoutes);