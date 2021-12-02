import express from 'express';
import path from 'path';
import viz from './viz.js';
import fs from 'fs';
import getHuntspace from './huntspace_util.js';
import ejs from 'ejs';
// const { Pool } = require('pg')

const PORT = process.env.PORT || 5000;
const app = express();
console.log("index.js is running...");

/*
NOTES: Trying to pass the data variable from the index.js to the ejs but it is telling me that GetHuntspace isn't a function.
Check the exports to see if it's exporting as a function: It is [console.log(typeof getHuntspace)]
See if it saving to locals as a function.
Check ejs documentation for function calling syntax and implementation examples.
*/
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });
// .get('/db', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT * FROM test_table');
//     const results = { 'results': (result) ? result.rows : null};
//     res.render('pages/db', results );
//     client.release();
//   } catch (err) {
//     console.error(err);
//     res.send("Error " + err);
//   }
// })

const simulation_data  = fs.readFileSync('./data/staghunt.json', 'utf8');
const sim_obj = JSON.parse(simulation_data);
app.locals.huntspace_util = getHuntspace;

app.engine('.html', ejs.__express);
app.set('views', path.join(path.resolve(), 'views')); // __dirname = path.resolve();
app.use(express.static(path.join(path.resolve(), 'public')));
app.set('view engine', 'html');

app.get('/', function(req, res) {
  res.render('pages/index.ejs', { sim_data: sim_obj });
});

app.listen(PORT);
console.log('listening on port ' + PORT);
