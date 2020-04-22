import { ControllerInput } from '../core';

const list = async (conn: ControllerInput) => {
  const products = await conn.model.findAll({order: [ ['id', 'DESC']]});
  conn.response.render('product', { products});
};

const show = async (conn: ControllerInput) => {
  const { id } = conn.request.params;
  const product = await conn.model.findOne({where: {id}});
  conn.response.render('product/show', { product });
};

const newRegistry = (conn: ControllerInput) => {
  conn.response.render('product/new');
};

const create = async (conn: ControllerInput) => {
  try {
    await conn.model.create(conn.request.body);
    conn.response.redirect('/products');
  } catch(error) {
    conn.response.render('product/new');
  }
};

const edit = async (conn: ControllerInput) => {
  try {
    const { id } = conn.request.params;
    const product = await conn.model.findOne({where: {id}});
    conn.response.render('product/edit', { product });
  } catch(error) {
    conn.response.redirect('products');
  }
};

const update = async (conn: ControllerInput) => {
  const { id } = conn.request.params;

  try {
    await conn.model.update(conn.request.body, { where: { id } });
    conn.response.redirect('/products');
  } catch(error) {
    conn.response.render('product/edit' + id);
  }
};

const remove = async (conn: ControllerInput) => {
  const { id } = conn.request.params;

  try {
    await conn.model.destroy({ where: { id } });
    conn.response.redirect('/products');
  } catch(error) {
    conn.response.render('/products');
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