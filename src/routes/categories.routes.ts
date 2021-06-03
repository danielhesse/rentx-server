import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { lisCategoriesController } from '../modules/cars/useCases/ListCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return lisCategoriesController.handle(request, response);
});

export { categoriesRoutes };
