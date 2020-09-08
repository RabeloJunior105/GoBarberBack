import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

interface createAppointmentDTO {
  fk_provider: string,
  date: Date
}
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  private appointments: Appointment[];

  public all(): Appointment[] {
    return this.appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointmentSameDate = await this.findOne({
      where: { date },
    });

    return findAppointmentSameDate || null;
  }
}

export default AppointmentsRepository;
