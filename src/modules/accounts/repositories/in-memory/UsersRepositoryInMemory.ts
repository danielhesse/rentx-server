import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../../dtos/IUpdateUserAvatarDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    await this.users.push(user);

    return user;
  }

  async updateAvatar({
    user_id,
    avatar_file,
  }: IUpdateUserAvatarDTO): Promise<void> {
    const user = this.users.find(user => user.id === user_id);

    user.avatar = avatar_file;

    this.users.push(user);
  }
}

export { UsersRepositoryInMemory };
