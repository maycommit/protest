import { createRoutes, resource } from "../core";
import userController from "./controllers/user-controller";

const routes = [
  ...resource('/user', userController)
]; 

export default createRoutes(routes);