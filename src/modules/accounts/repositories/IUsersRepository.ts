import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../dtos/IUpdateUserAvatarDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  updateAvatar(data: IUpdateUserAvatarDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
