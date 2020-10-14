import { Router } from 'express';
import { container } from 'tsyringe'
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersControllers from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersControllers()
const userAvatarController = new UserAvatarController()


usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
