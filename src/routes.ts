import { createRoutes, resource } from './core';
import userController from './controllers/user-controller';
import userModel from './models/user';

const routes = [
  ...resource('/users', userController, userModel)
]; 

export default createRoutes(routes);