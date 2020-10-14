import Appointment from '../infra/typeorm/entities/Appointment'

import ICreateAppointmentDTO from '../dtos/iCreateAppointmentDTO'

export default interface iAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
