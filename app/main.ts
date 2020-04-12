import express from 'express';
import path from 'path';
import expressLayout from 'express-ejs-layouts';
import routes from './routes';
import { Sequelize } from 'sequelize';
import config from './config';


const app = express();

const sequelize = new Sequelize(config);

sequelize.authenticate()
  .then(() => console.log('Databse success auth'))
  .catch(() => console.log('Databse connection error'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(expressLayout);
app.set('layout', 'layout');

routes(app);

app.listen(3000, () => console.log('Start application...'));