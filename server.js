//using express module
//-- use hbs module for redering dynamic content (npm install hbs --save)

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//-- partials: is used for common tempalate in all the web pages 
//-- For this we have to register the a folder from where the partial hbs will come 
hbs.registerPartials(__dirname + '/views/partials')

//-- settings: setting the view engine
app.set('view engine', 'hbs');

//-- Express middleware 
//-- allow you to use static page directly without providing the routing
app.use(express.static(__dirname + '/public'));
//-- in this case doing next is mandatory and it is always required, otherwise 
//middle ware is not going to run 
app.use((req, resp, next) => {
    //-- log request method and url for each call
    var log = `${new Date().toString()}- ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

//-- maintainance mode 
//-- in this case call call use on app and don't call next
// -- comment it if not getting used.
// app.use((req, resp, next)=>{
//     resp.render('maintainance.hbs');
// })

//-- as like partials we can also register some common function as helper
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});

//-- localhost
app.get('/', (req, resp)=>{

    //-- sending html
    //resp.send("<h1>Hello  Sanjeev</h1>");

    //-- sending plain text
    //resp.send("Hello  Sanjeev, this is your first web server application! ");

    resp.render('home.hbs', {
        pageTitle:'Home Page', 
        welcomeMessage: 'Welcome to my web page!',
        currentYear: new Date().getFullYear()
    });

    //-- sending json data
    // resp.send({
    //     name: 'Sanjeev Sinha',
    //     age: 45,
    //     likes:[
    //         'Reading', 
    //         'Cooking', 
    //         'Learning new stuff'
    //     ]
    // });

});

//route 2: about

app.get('/about', (req, resp) =>{

    //resp.send("<h1>about page</h1>");

    //-- setting dynamic data to current page is easy just by passing 
    //-- handle bar
    resp.render('about.hbs', {
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
})

//-- listining to port 3000
app.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
});