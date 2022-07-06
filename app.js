// adds dependencies
const express = require('express');
const { render } = require('pug');
const app = express();
const { projects } = require('./data.json');
// sets view engine to pug
app.set('view engine', 'pug');
// serves static files in public folder
app.use('/static', express.static('public'));

// sets routes
// route to index home page
app.get('/', (req, res, next) => {
    res.render('index', { projects });
});
// route to about me page
app.get('/about', (req, res, next) => {
    res.render('about');
});
// route to each project page
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({id}) => id === +projectId );
    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        err.message = 'Looks like the page you requested does not exist.';
        next(err);
    }
});

// 404 error handler
app.use((req, res, next) => {
    err = new Error('Page not found');
    err.status = 404;
    err.message = 'Looks like the page you requested does not exist!';
    next(err);
});

//global error handler
app.use((err, req, res, next) => {
    if (err) {
      console.log('Global error handler called', err);
    }
    if (err.status === 404) {
      res.status = 404;
      res.render('page-not-found', { err });
    } else {
      err.message = err.message || 'You have hit an error!';
      err.status = (err.status || 500);
      res.render('error', { err });
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});