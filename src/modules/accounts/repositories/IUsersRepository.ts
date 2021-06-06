import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../dtos/IUpdateUserAvatarDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  updateAvatar(data: IUpdateUserAvatarDTO): Promise<void>;
}

export { IUsersRepository };
