import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/Typeorm/entities/Users';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const UsersRepository = getRepository(User);

    const user = await UsersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Autenticação inválida', 401);
    }

    const passwrodMatch = await compare(password, user.password);

    if (!passwrodMatch) {
      throw new AppError('Autenticação inválida', 401);
    }
    const token = sign(
      { name: user.name, email: user.email },
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return {
      user,
      token,
    };
  }
}

export default AuthenticateService;
