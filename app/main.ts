import express from 'express';
import expressLayout from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayout);
app.set('layout', '../app/views/layout');
// app.use(bodyParser.urlencoded());


routes(app);

app.listen(3000, () => console.log('Start application...'));