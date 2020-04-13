import { createResourceController, Conn, resource } from "../../core";

const list = (conn: Conn) => {
  conn.res.render('user');
};

const create = (conn: Conn) => {
  conn.res.render('user/create');
};

const edit = (conn: Conn) => {
  conn.res.render('user/edit');
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