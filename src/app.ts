import fs from 'fs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import color from 'colors';
import path from 'path';

import routes from './routes'

const settingsJSON:          any        =           fs.readFileSync(path.join(__dirname, '../', 'config', 'localhost.json')); 
const settings:              any        =           JSON.parse(settingsJSON);

const app: any = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json({limit: "2000mb"}));

app.use('/api', routes);

app.listen(settings.PORT, () => console.log(color.green('Сервер запущен, батеньки...')))
