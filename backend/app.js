const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const limiter = require('./middlewares/rateLimit');

const handleError = require('./middlewares/handleError');
const entrance = require('./routes/auth');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const routesNotFound = require('./routes/errorNotFound');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
mongoose.connect(DB_URL);

app.use(helmet());
app.use(bodyParser.json());
app.use(limiter);

app.use(entrance);
app.use(auth, routesUsers);
app.use(auth, routesCards);
app.use(routesNotFound);

app.use(errors());
app.use(handleError);

app.listen(PORT);
