import { createResourceController, Conn, resource } from "../../core";

const list = (conn: Conn) => {
  conn.res.render('../app/views/user');
};

const create = (conn: Conn) => {
  conn.res.render('../app/views/user/create');
};

const edit = (conn: Conn) => {

};

const show = (conn: Conn) => {

};

const remove = (conn: Conn) => {

};

export default {
  list,
  create,
  edit,
  show,
  remove,
};