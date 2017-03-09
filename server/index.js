const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

const app = express();



app.listen(4000);

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    res.send(req.body);
    console.log(req.body);
    let toNumber = req.body.number;
    let text = req.body.text;

    nexmo.message.sendSms(
        18282297913, toNumber, text, { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
                let data = { id: responseData.messages[0]['message-id'], number: responseData.messages[0]['to'] };
                io.emit('smsStatus', data);
            }
        }
    );
});


const nexmo = new Nexmo({
    apiKey: '84709e4a',
    apiSecret: 'c3e1397c27d2547d',
}, { debug: true });


const io = socketio(server);
io.on('connection', (socket) => {
    console.log('Connected');
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});