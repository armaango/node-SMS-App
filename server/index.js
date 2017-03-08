const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();



app.listen(4000);

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('index');
});

