const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const {connectDb} = require('./helpers/db');
const {port, host, db, authApiUrl} = require('./configuration/index');
const app = express();
const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);


const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Database: ${db}`);

        const silence = new Post({name: 'Silence'});
        console.log(silence.name);

        silence.save((err, savedSilence) => {
            if (err) return console.error(err);
            console.log('savedSilence:', savedSilence);
        });

        Post.find((err, posts) => {
            if (err) return console.error(err);
            console.log('posts:', posts);
        });
    });
}

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly');
});

app.get('/testwithcurrentuser', (req, res) => {
    axios.get(authApiUrl + '/currentuser')
        .then(response => {
            res.json({
                testWithCurrentUser: true,
                currentUserFromAuth: response.data
            });
        });
});

app.get('/api/testapidata', (req, res) => {
    res.json({
        testwithapi: true
    });
});


connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)
