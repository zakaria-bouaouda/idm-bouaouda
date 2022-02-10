const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')


//Connexion a la base
// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://zakaria:ok@clusterzakaria.dmmf8.mongodb.net/ExempleNodeJS?retryWrites=true&w=majority'
    ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('Connexion a la base faite avec succès')
    },
    error => {
        console.log("Connexion a la base échouee " + error)
    }
)

//Api Utilisateur

const api = require('./Routes/user-routes')
const path = require('path')


// mongoose.set('useCreateIndex', true);


// Express/CORS settings
const app = express();
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/',express.static(path.join(__dirname,'dist')));

app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname,"dist","index.html"));
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false

}));


app.use('/public', express.static('public'));

app.use('/user', api)




// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connexion au port  : ' + port)
})

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
