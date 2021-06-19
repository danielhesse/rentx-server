import { Router } from 'express';

import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { sessionsRoutes } from './sessions.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/cars', carsRoutes);
routes.use(sessionsRoutes);

export { routes };
