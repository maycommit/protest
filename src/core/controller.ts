import express from 'express';
import { Model } from 'sequelize/types';

export type ModelRegistry = (new () => Model<unknown, unknown>) & typeof Model

export interface ControllerInput {
  request: express.Request;
  response: express.Response;
  model: ModelRegistry;
}

export interface Resource {
  list: (input: ControllerInput) => void;
  newRegistry: (input: ControllerInput) => void;
  create: (input: ControllerInput) => void;
  show: (input: ControllerInput) => void;
  edit: (input: ControllerInput) => void;
  update: (input: ControllerInput) => void;
  remove: (input: ControllerInput) => void;
}