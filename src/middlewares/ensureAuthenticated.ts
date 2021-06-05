import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface ITokenPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, 'ac3ee9f8024e0ce1b14f996343ca15dc');

    const { sub } = decoded as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
