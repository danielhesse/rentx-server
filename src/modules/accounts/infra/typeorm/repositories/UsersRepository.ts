import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../../../dtos/IUpdateUserAvatarDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);

    return user;
  }

  async updateAvatar({
    user_id,
    avatar_file,
  }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.repository.findOne(user_id);

    user.avatar = avatar_file;

    await this.repository.save(user);
  }

  async save(data: any): Promise<void> {
    const user = await this.repository.findOne(data.id);

    user.password = data.password;

    await this.repository.save(user);
  }
}

export { UsersRepository };
