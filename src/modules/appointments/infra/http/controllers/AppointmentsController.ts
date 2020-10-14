import { Request, Response } from 'express'
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
export default class AppointmentController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { provider, date } = req.body;
    const data = parseISO(date);

    const createAppointmentService = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmentService.execute({
      fk_provider: provider,
      date: data,
    });
    return res.json(appointment);
  }

}
