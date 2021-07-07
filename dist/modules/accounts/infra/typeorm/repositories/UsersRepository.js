"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license
  }) {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license
    });
    await this.repository.save(user);
    return user;
  }

  async updateAvatar({
    user_id,
    avatar_file
  }) {
    const user = await this.repository.findOne(user_id);
    user.avatar = avatar_file;
    await this.repository.save(user);
  }

  async save(data) {
    const user = await this.repository.findOne(data.id);
    user.password = data.password;
    await this.repository.save(user);
  }

}

exports.UsersRepository = UsersRepository;