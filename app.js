// adds dependencies
const express = require('express');
const { render } = require('pug');
const app = express();
const data = require('./data.json');
// sets view engine to pug
app.set('view engine', 'pug');
// serves static folder
app.use('/static', express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index', { project: data.projects}); //"with the locals set to data.prjects???"
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {
    res.render();
});