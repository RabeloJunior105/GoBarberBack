
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe'
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '../repositories/iUsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
    ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

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
