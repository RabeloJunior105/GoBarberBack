import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/iUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository) { }

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkemailExists = await this.usersRepository.findByEmail(email);

    if (checkemailExists) {
      throw new AppError('Este email já existe');
    }
    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });


    return user;
  }
}
