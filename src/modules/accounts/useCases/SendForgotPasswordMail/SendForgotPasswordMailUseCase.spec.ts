import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayJsDateprovider } from '@shared/container/providers/DateProvider/implementations/DayJsDateprovider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepostoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let dateProvider: DayJsDateprovider;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepostoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateprovider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepostoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail');

    const user = await usersRepositoryInMemory.create({
      name: 'Chris Hart',
      email: 'nuaw@wumo.aq',
      password: '121212',
      driver_license: '822917',
    });

    await sendForgotPasswordMailUseCase.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email fi user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute({ email: 'av@oviwizij.mh' }),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepostoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'Rosa Osborne',
      email: 'bem@onrud.mx',
      password: '121212',
      driver_license: '608482',
    });

    await sendForgotPasswordMailUseCase.execute({ email: 'bem@onrud.mx' });

    expect(generateTokenMail).toBeCalled();
  });
});
