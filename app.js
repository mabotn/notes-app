var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var mongodb = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId

var app = express()
var app_path = __dirname
var connectionString = 'mongodb://localhost:27017/notes';

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'notes'
}))

mongodb.connect(connectionString, (err, db) => {
    require('./router/view.js')(app, app_path, db)
    require('./router/create.js')(app, app_path, db)
    require('./router/edit.js')(app, app_path, db, ObjectId)
    require('./router/delete.js')(app, app_path, db, ObjectId)
    require('./router/login.js')(app, app_path, db)
    require('./router/register.js')(app, app_path, db)
    require('./router/logout.js')(app)
})

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('notes')
    } else {
        res.redirect('login')
    }
})

app.listen(3000)