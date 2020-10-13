import { Router } from 'express';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/auth', sessionsRoutes);
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

export default routes;
