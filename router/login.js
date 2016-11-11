module.exports = (app, app_path, db) => {
    var crypto = require('crypto')

    app.get('/login', (req, res) => {
        if (req.session.user) {
            res.redirect('notes')
        } else {
            res.sendFile(app_path + '/views/login.html')
        }
    })

    app.post('/login', (req, res) => {
        var user = {
            username: req.body.username,
            password: crypto.createHash('sha1').update(req.body.password).digest('hex')
        }

        var users = db.collection('users');
        users.find(user).toArray((err, result) => {
            if (result.length > 0) {
                req.session.user = result[0]
                res.redirect('/')
            } else {
                res.redirect('/login?error=invalid')
            }
        })
    })
}