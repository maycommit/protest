import express from 'express';
import { ControllerInput, Resource, ModelRegistry } from './controller';
import { Model, Sequelize } from 'sequelize/types';

export interface Route {
  url: string;
  controller: (input: ControllerInput) => void;
  model: (sequelize: Sequelize) => ModelRegistry;
  method: string;
}

export const resource = (
  url: string, resourceController: Resource, model: (sequelize: Sequelize) => ModelRegistry
): Route[] => ([
  {
    url,
    controller: resourceController.list,
    model,
    method: 'get',
  },
  {
    url: `${url}/show/:id`,
    controller: resourceController.show,
    model,
    method: 'get'
  },
  {
    url: `${url}/new`,
    controller: resourceController.newRegistry,
    model,
    method: 'get'
  },
  {
    url: `${url}/create`,
    controller: resourceController.create,
    model,
    method: 'post'
  },
  {
    url: `${url}/edit/:id`,
    controller: resourceController.edit,
    model,
    method: 'get',
  },
  {
    url: `${url}/update/:id`,
    controller: resourceController.update,
    model,
    method: 'post'
  },
  {
    url: `${url}/remove/:id`,
    controller: resourceController.remove,
    model,
    method: 'get'
  }
]);

export const createRoutes = (routes: Route[]) => (app: express.Express, sequelize: Sequelize) => {
  routes.map(({ url, controller, model, method }) => {
    switch(method) {
      case 'get': {
        return app.get(url, (request, response) => {
          const modelRegistry = model(sequelize);
      
          controller({ request, response, model: modelRegistry });
        });
      }
      case 'post': {
        return app.post(url, (request, response) => {
          const modelRegistry = model(sequelize);
    
          controller({ request, response, model: modelRegistry });
        });
      }
    }
    
  });
};