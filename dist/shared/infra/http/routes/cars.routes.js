"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _CreateCarController = require("@modules/cars/useCases/CreateCar/CreateCarController");

var _CreateCarSpecificationController = require("@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController");

var _ListAvailableCarsController = require("@modules/cars/useCases/ListCars/ListAvailableCarsController");

var _UploadCarImagesController = require("@modules/cars/useCases/UploadCarImages/UploadCarImagesController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImagesController = new _UploadCarImagesController.UploadCarImagesController();
carsRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:car_id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
const uploadCarImages = (0, _multer.default)(_upload.default);
carsRoutes.post('/images/:car_id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, uploadCarImages.array('images'), uploadCarImagesController.handle);