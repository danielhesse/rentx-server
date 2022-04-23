"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("@shared/errors/AppError");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const usersRepostory = new _UsersRepository.UsersRepository();
  const user = await usersRepostory.findById(id);

  if (!user.is_admin) {
    throw new _AppError.AppError('User does not have admin permission!');
  }

  return next();
}