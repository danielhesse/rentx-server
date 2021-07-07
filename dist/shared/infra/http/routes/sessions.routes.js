"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionsRoutes = void 0;

var _express = require("express");

var _AuthenticateUserController = require("@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController");

var _RefreshTokenController = require("@modules/accounts/useCases/RefreshToken/RefreshTokenController");

const sessionsRoutes = (0, _express.Router)();
exports.sessionsRoutes = sessionsRoutes;
const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
sessionsRoutes.post('/', authenticateUserController.handle);
sessionsRoutes.post('/refresh-token', refreshTokenController.handle);