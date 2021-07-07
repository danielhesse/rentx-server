"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayJsDateprovider = require("@shared/container/providers/DateProvider/implementations/DayJsDateprovider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../CreateUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayJsDateprovider.DayJsDateprovider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
      driver_license: '0001234'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'nonexistent@example.com',
      password: '1234'
    })).rejects.toEqual(new _AppError.AppError('Email/password is incorrect!'));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
      driver_license: '0001234'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrectPassword'
    })).rejects.toEqual(new _AppError.AppError('Email/password is incorrect!'));
  });
});