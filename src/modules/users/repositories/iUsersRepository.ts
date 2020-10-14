import User from '../infra/typeorm/entities/Users'
import IcreateUserDTO from '../dtos/iCreateDTO'

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IcreateUserDTO): Promise<User>;
  save(user: IcreateUserDTO): Promise<User>;
}

/*
FindById
FindByEmail
Create and save
Save

*/
