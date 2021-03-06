import 'reflect-metadata'
import { container } from 'tsyringe'

import IAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments.repositories'

import IUsersRepository from '@modules/users/repositories/iUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'


container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
