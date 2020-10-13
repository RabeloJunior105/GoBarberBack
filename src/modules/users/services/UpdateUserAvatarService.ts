import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/Typeorm/entities/Users';
import UploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Apenas usuários autenticados podem alterar avatares',
        401,
      );
    }
    if (user.avatar) {
      // deletar o avatar
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;