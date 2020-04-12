import express from 'express';
import { ResourceController } from "./controller";

export interface Conn {
  req: express.Request;
  res: express.Response;
}

interface Route {
  url: string;
  action: (conn: Conn) => void;
}


export const resource = (url: string, controller: ResourceController) => ([
  {
    url,
    action: controller.list
  },
  {
    url: `${url}/new`,
    action: controller.create
  },
  {
    url: `${url}/edit`,
    action: controller.edit
  }
]);

export const createRoutes = (routes: Route[]) => (app: express.Express) => {
  routes.map(route => app.get(route.url, (req, res) => route.action({ req, res })));
};