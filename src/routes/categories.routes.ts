import { Router } from 'express';

import CreateCategoryServer from '../services/CreateCategoryService';

const categoriesRouter = Router();

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;

  const categoriesServer = new CreateCategoryServer();

  const category = await categoriesServer.execute({
    title,
  });

  return response.json(category);
});

export default categoriesRouter;
