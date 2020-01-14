
// Pastes and their content of the system
const pastes = {
  name: './server',
  files: [
    {
      name: './server/server.js',
      content: `
// Loading the configured server and runing it
import createServer from './app/config/app.js';
const app = createServer();

// Importing infra layers
import { product } from './app/infra/product.js';

// Running infra
product(app)

// Listening the port
app.listen(3000);
      `
    }
  ],
  pastes: [
    {
      name: './server/app',
      files: [],
      pastes: [
        {
          name: './server/app/config',
          files: [
            {
              name: './server/app/config/app.js',
              content: `
// Importing express
import express from 'express';
// Importing body-parser
import body_parser from 'body-parser';
// Importing cors
import cors from 'cors';

export default function createServer() {

  // Creating server and returning it
  // Starting Express and loading deps
  return express()

    // Loading cors into the server
    .use(cors())

    // Loading body parser (using 200mb as default, you can change it)
    .use(body_parser.json({ limit: '200mb' }))
    .use(body_parser.urlencoded({ extended: true }))

  // Setting the dist folder as public, after it, users can access the Html in it
  // .use(express.static(__dirname.split('app')[0] + 'dist'))

}
                `
            },
            {
              name: './server/app/config/database.js',
              content: `
// DATABASE CONFIGURATION

let database_data = {

  // Host name
  host: 'localhost',

  // Database Port
  port: 3306,

  // Database UserNmae
  user: 'root',

  // Database Password (please store it in a better way)
  password: '1234',

  // Database Name
  database: 'loja'

}

// Exporting
export default database_data;
                `
            }
          ],
          pastes: []
        },
        {
          name: './server/app/dist',
          files: [],
          pastes: []
        },
        {
          name: './server/app/functions',
          files: [
            {
              name: './server/app/functions/database.js',
              content: `
// Importing MySql
import mysql from 'mysql';

// Getting DataBase info from config files
import database_data from '../config/database.js';

// Starting the connection with the database
const con = mysql.createConnection(database_data);;

// Try to connect - fucntion above*
setConnection();

// Function to connect with the databse
function setConnection() {
  // Start the connection
  con.connect((err) => {
    if (err) {
      // In case of errors, it will log to you
      console.log(new Date().toLocaleDateString() + ' / ' + new Date().toLocaleTimeString(), 'Error Connecting to DataBase: ');
      console.log(err);
      // 2 secconds after, the server will try to connect again (2000 > 2000 ms > 2s)
      setTimeout(setConnection, 2000);
    }
  });
  // 'When Error'
  con.on('error', (err) => {
    // Consoling the error
    console.log(new Date().toLocaleDateString() + ' / ' + new Date().toLocaleTimeString(), 'DataBase Error: ');
    console.log(err);
    // If the error is 'PROTOCOL_CONNECTION_LOST' means that the databases has disconnected
    // Then it will try to connect again
    if (err.code === 'PROTOCOL_CONNECTION_LOST') setConnection();
    // Or console it
    else throw err;
  });
}

// Exporting connection as con, it will be used to get data from database
export default con;
                `
            },
            {
              name: './server/app/functions/functions.js',
              content: `
// Importing Database connection as con
import con from '../functions/database.js';

// Get body object and using in the query
export let bodyQuery = (query, callback = null, send = null) => {
  return (req, res) => {
    return con.query(query, req.body, response(res, callback ? callback : null, send ? send : null))
  }
};

export let paramQuery = (query, callback = null, send = null) => {
  return (req, res) => {
    console.log(query, callback, send)
    return con.query(query, Object.values(req.params), response(res, callback ? callback : null, send ? send : null))
  }
};

export let response = (res, callback = null, send = null) => (err, result) => {
  if (err) {
    if (err.code == 'ER_DUP_ENTRY') res.json({ code: 'DUP_ENTRY' });
    else {
      console.log(new Date().toLocaleDateString() + ' / ' + new Date().toLocaleTimeString());
      console.log(err);
      res.json({ code: 100, err });
    }
  }
  else callback ? callback(res, result) : res.json({ code: 200, result, send });
}
                `
            }
          ],
          pastes: []
        },
        {
          name: './server/app/infra',
          files: [
            {
              name: './server/app/infra/product.js',
              content: `
import { paramQuery, bodyQuery } from "../functions/functions.js";

// Exemple Querys

// In your database, for better integration, 
// use plural for database table names
// use id_'name of the table(in singular as convention)' as primary id,
// and archived as achived logic

// insert query
const post_product = 'insert into products set ?';
// read queries
const get_product = 'select * from products where id_product = ?';
const get_products = 'select * from products';
// update query
const put_product = 'replace products set ?';
// delete query (archive)
const delete_product = 'update products set archived = 1 where id_product = ?';

// Exporting the api
export function product(app) {

  // app.'type of requisition'('rout', callback);
  // use '/api' before for requisitions that only loged user can access
  // create
  app.post('/api/product', bodyQuery(post_product));
  // read
  app.get('/api/product/:id_product', paramQuery(get_product));
  app.get('/api/product/', paramQuery(get_products));
  // update
  app.put('/api/product', bodyQuery(put_product));
  // delete
  app.delete('/api/product', paramQuery(delete_product));

}
                `
            }
          ],
          pastes: []
        },
      ]
    }
  ]
};


// Exporting pastes
export default pastes;