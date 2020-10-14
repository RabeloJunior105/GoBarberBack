import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentsController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

const appointmentController = new AppointmentController()


appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (req, res) => {
  const appointment = await appointmentsRepository.find();

  return res.json(appointment);
}); */

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
