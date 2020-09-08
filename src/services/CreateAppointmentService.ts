import { startOfHour } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/appointments.repositories';
import AppError from '../errors/AppError';

/*
Receber as informações
tratativas de erros e exceções
acesso ao repositorio de agendamento
*/

interface RequestDTO {
  fk_provider: string,
  date: Date,
}
/*
* dependency inversion
*/
class CreateAppointmentService {
  public async execute({ date, fk_provider }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentSameDate = await appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentSameDate) {
      throw new AppError('Esse horario já está ocupado');
    }

    const appointment = appointmentRepository.create({
      fk_provider, date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return (appointment);
  }
}

export default CreateAppointmentService;
