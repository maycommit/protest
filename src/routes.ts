import { createRoutes, resource } from './core';
import productController from './controllers/product-controller';
import productModel from './models/product';

const routes = [
  ...resource('/products', productController, productModel)
]; 

export default createRoutes(routes);