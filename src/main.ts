import express from 'express';
import path from 'path';
import expressLayout from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import db from './models';
import routes from './routes';

const app = express();

(async () => {
  try {
    const models = db;

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, './views'));
    app.use(expressLayout);
    app.set('layout', 'layout');

    app.use(bodyParser.urlencoded());

    routes(app, models.sequelize);

    app.listen(3000, () => console.log('Start application...'));
  } catch (error) {
    console.error(error);
  }
})();