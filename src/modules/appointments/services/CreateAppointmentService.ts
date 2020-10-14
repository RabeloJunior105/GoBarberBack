import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequestDTO {
  fk_provider: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({
    date,
    fk_provider,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentSameDate) {
      throw new AppError('Esse horario já está ocupado');
    }

    const appointment = await this.appointmentsRepository.create({
      fk_provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
