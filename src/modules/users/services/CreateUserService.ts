import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/Typeorm/entities/Users';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkemailExists = await userRepository.findOne({
      where: { email },
    });

    if (checkemailExists) {
      throw new AppError('Este email já existe');
    }
    const hashPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
