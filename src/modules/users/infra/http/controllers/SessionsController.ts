import { Request, Response } from 'express'
import { container } from 'tsyringe'
import AuthenticateSession from '@modules/users/services/AuthenticateSession';
export default class SessionsController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticate = container.resolve(AuthenticateSession);

    const { user, token } = await authenticate.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }

}
