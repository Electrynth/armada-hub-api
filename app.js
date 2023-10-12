const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('ssl/server.key', 'utf8');
const cert = fs.readFile('ssl/server.crt', 'utf8');

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

require('./routes/user.routes')(app);
require('./routes/user_list.routes')(app);

app.get('/', async (req, res) => { res.sendStatus(200) });

const start = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL).then(() => {
            console.log('Successfully connected to database.')
        }).catch((e) => {
            console.error('Failed to connect to database.', e.message);
            process.exit(1);
        });
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}

start();

const server = https.createServer({ key, cert }, app)

server.listen(process.env.API_PORT, () => {
    console.log(`Server started on port ${process.env.API_PORT}.`)
});