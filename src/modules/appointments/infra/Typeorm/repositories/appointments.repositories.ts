import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository'
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentSameDate = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointmentSameDate;
  }

  public async create({ fk_provider, date }: iCreateAppointmentDTO): Promise<Appointment > {

    const appointment = this.ormRepository.create({ fk_provider, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
