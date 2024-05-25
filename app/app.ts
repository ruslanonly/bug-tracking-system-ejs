const path = require('path');
// load dependencies
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import expressEjsLayouts from 'express-ejs-layouts'

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(expressEjsLayouts)
app.set('layout', path.join(__dirname, '../views/layout/main'))
app.set('view engine', 'ejs');
app.set('views', 'views');

export {
    app
}