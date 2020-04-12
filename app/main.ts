import express from 'express';
import expressLayout from 'express-ejs-layouts';
import bodyParser from 'body-parser';

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.render('');
});

app.listen(3000, () => console.log('Start application...'));