import { Router } from 'express';

import AuthenticateSession from '../../services/AuthenticateSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const authentcate = new AuthenticateSession();

    const { user, token } = await authentcate.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default sessionsRouter;
