import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/DevolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.use(ensureAuthenticated);

rentalsRoutes.post('/', createRentalsController.handle);

rentalsRoutes.post('/devolution/:rental_id', devolutionRentalController.handle);

rentalsRoutes.get('/user', listRentalsByUserController.handle);

export { rentalsRoutes };
