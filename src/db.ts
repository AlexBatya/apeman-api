import fs from 'fs';
import path from 'path';
import mysql from 'mysql2';

const sqlJSON: any = fs.readFileSync(path.join(__dirname, '../', 'config', 'localhost.json'));
const sql: any = JSON.parse(sqlJSON).SQL;

const db = mysql.createConnection(sql);
export default db;