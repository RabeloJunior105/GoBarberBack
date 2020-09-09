import { Router } from 'express';
import appointmentsRoutes from './modules/appointments.routes';
import usersRoutes from './modules/users.routes';
import sessionsRoutes from './modules/session.routes';

const routes = Router();

routes.use('/auth', sessionsRoutes);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

export default routes;
