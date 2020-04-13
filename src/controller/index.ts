import { Conn } from 'router';

export interface ResourceController {
  list: (conn: Conn) => void;
  create: (conn: Conn) => void;
  edit: (conn: Conn) => void;
  show: (conn: Conn) => void;
  remove: (conn: Conn) => void;
}

export const createResourceController = (resource: ResourceController) => {
  
};