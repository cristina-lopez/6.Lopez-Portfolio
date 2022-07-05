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
app.get('/', (req, res, next) => {
    res.render('index', { projects }); //"with the locals set to data.prjects???"
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({id}) => id === +projectId );
    if (project) {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
});

// 404 error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    err.message = 'Looks like the page you requested does not exist.';
    next(err);
});

// global error
  app.use((err, req, res, next) => {
    err.message = err.message || "There was a server error!";
    err.status = (err.status || 500);
    console.log(`You have hit a ${err.status} error!`);
    res.send(`Error Code: ${err.status} : ${err.message}`);
  });



app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});