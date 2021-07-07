"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswordController = require("@modules/accounts/useCases/ResetPassword/ResetPasswordController");

var _SendForgotPasswordMailController = require("@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMail = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswordController.ResetPasswordController();
passwordRoutes.post('/forgot-password', sendForgotPasswordMail.handle);
passwordRoutes.post('/reset-password', resetPasswordController.handle);