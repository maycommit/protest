import { ControllerInput } from '../core';

const list = async (conn: ControllerInput) => {
  const users = await conn.model.findAll({order: [ ['id', 'DESC']]});
  conn.response.render('user', {users});
};

const show = async (conn: ControllerInput) => {
  const { id } = conn.request.params;
  const user = await conn.model.findOne({where: {id}});
  conn.response.render('user/show', {user});
};

const newRegistry = (conn: ControllerInput) => {
  conn.response.render('user/new');
};

const create = async (conn: ControllerInput) => {
  try {
    await conn.model.create(conn.request.body);
    conn.response.redirect('/users');
  } catch(error) {
    conn.response.render('user/new');
  }
};

const edit = async (conn: ControllerInput) => {
  try {
    const { id } = conn.request.params;
    const user = await conn.model.findOne({where: {id}});
    conn.response.render('user/edit', {user});
  } catch(error) {
    conn.response.redirect('users');
  }
};

const update = async (conn: ControllerInput) => {
  const { id } = conn.request.params;

  try {
    await conn.model.update(conn.request.body, { where: { id } });
    conn.response.redirect('/users');
  } catch(error) {
    conn.response.render('user/edit' + id);
  }
};

const remove = async (conn: ControllerInput) => {
  const { id } = conn.request.params;

  try {
    await conn.model.destroy({ where: { id } });
    conn.response.redirect('/users');
  } catch(error) {
    conn.response.render('/users');
  }
};

export default {
  list,
  newRegistry,
  create,
  show,
  edit,
  update,
  remove,
};