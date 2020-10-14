import { Request, Response } from 'express'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';
export default class UserAvatarController {

  public async update(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: filename,
    });

    delete user.password;

    return res.json(user);
  }

}
