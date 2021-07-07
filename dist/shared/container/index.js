"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers/DateProvider");

require("@shared/container/providers/MailProvider");

require("@shared/container/providers/StorageProvider");

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _UsersTokensRepository = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarImagesRepository = require("@modules/cars/infra/typeorm/repositories/CarImagesRepository");

var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalsRepository = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");

_tsyringe.container.registerSingleton('CategoriesRepository', _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton('SpecificationsRepository', _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton('UsersTokensRepository', _UsersTokensRepository.UsersTokensRepository);

_tsyringe.container.registerSingleton('CarsRepository', _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton('CarImagesRepository', _CarImagesRepository.CarImagesRepository);

_tsyringe.container.registerSingleton('RentalsRepository', _RentalsRepository.RentalsRepository);