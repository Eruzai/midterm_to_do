// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session')

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['qwe', 'rty'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const itemApiRoutes = require('./routes/items-api');
const categoryItemsRoute = require('./routes/items_by_category_and_user');
const addItemRoute = require('./routes/add_item');
const logInRoute = require('./routes/login');
const logOutRoute = require('./routes/logout');
const userApiRoutes = require('./routes/users-api');
const updateItemRoute = require('./routes/update_list');
const deleteItemRoute = require('./routes/delete_item');
const markDoneRoute = require('./routes/mark_done');
const markToDoRoute = require('./routes/mark_to_do');
const updateUserRoute = require('./routes/update_user')

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/items', itemApiRoutes);
app.use('/api/categoryitems', categoryItemsRoute);
app.use('/additem', addItemRoute);
app.use('/login', logInRoute);
app.use('/logout', logOutRoute);
app.use('/api/users', userApiRoutes);
app.use('/updateitem', updateItemRoute);
app.use('/deleteitem', deleteItemRoute);
app.use('/markdone', markDoneRoute);
app.use('/marktodo', markToDoRoute);
app.use('/updateuser', updateUserRoute);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
