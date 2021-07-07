"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayJsDateprovider = require("@shared/container/providers/DateProvider/implementations/DayJsDateprovider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let usersTokensRepostoryInMemory;
let mailProviderInMemory;
let dateProvider;
describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepostoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayJsDateprovider.DayJsDateprovider();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepostoryInMemory, dateProvider, mailProviderInMemory);
  });
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail');
    const user = await usersRepositoryInMemory.create({
      name: 'Chris Hart',
      email: 'nuaw@wumo.aq',
      password: '121212',
      driver_license: '822917'
    });
    await sendForgotPasswordMailUseCase.execute({
      email: user.email
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an email fi user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute({
      email: 'av@oviwizij.mh'
    })).rejects.toEqual(new _AppError.AppError('User does not exists!'));
  });
  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepostoryInMemory, 'create');
    await usersRepositoryInMemory.create({
      name: 'Rosa Osborne',
      email: 'bem@onrud.mx',
      password: '121212',
      driver_license: '608482'
    });
    await sendForgotPasswordMailUseCase.execute({
      email: 'bem@onrud.mx'
    });
    expect(generateTokenMail).toBeCalled();
  });
});