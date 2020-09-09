import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../../repositories/appointments.repositories';
import CreateAppointmentService from '../../services/CreateAppointmentService';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();

  return res.json(appointment);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider, date } = req.body;
  const data = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({ fk_provider: provider, date: data });
  return res.json(appointment);
});

export default appointmentsRouter;
