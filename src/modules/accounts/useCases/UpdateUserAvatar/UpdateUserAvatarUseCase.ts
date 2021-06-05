import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUpdateUserAvatarDTO } from '../../dtos/IUpdateUserAvatarDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id, avatar_file }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/${user.avatar}`);
    }

    await this.usersRepository.updateAvatar({ user_id, avatar_file });
  }
}

export { UpdateUserAvatarUseCase };
