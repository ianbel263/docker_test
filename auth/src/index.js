const express = require('express');
const axios = require('axios');
const {connectDb} = require('./helpers/db');
const {port, host, db, apiUrl} = require('./configuration/index');
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Database: ${db}`);
    });
}

app.get('/test', (req, res) => {
    res.send('Our auth server is working correctly');
});

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/api/testapidata')
        .then(response => {
            res.json({
                testapidata: response.data
            });
        });
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '1234',
        email: 'foo@mail.com'
    });
});

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
