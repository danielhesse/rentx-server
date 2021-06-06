import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // User exists ?
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email/password is incorrect!');
    }

    // Confirm password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email/password is incorrect!');
    }

    // Generate JWT
    const token = sign({}, 'ac3ee9f8024e0ce1b14f996343ca15dc', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
