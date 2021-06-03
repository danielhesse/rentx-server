import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { importCategoryController } from '../modules/cars/useCases/ImportCategory';
import { lisCategoriesController } from '../modules/cars/useCases/ListCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return lisCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
