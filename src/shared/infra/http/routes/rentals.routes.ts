import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);

export { rentalsRoutes };
