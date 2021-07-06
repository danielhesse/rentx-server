import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../dtos/IUpdateUserAvatarDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  updateAvatar(data: IUpdateUserAvatarDTO): Promise<void>;
  save(data: any): Promise<void>;
}

export { IUsersRepository };
