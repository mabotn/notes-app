module.exports = (app, app_path, db) => {
    var crypto = require('crypto')

    app.get('/register', (req, res) => {
        if (req.session.user) {
            res.redirect('notes')
        } else {
            res.sendFile(app_path + '/views/register.html')
        }
    })

    app.post('/register', (req, res) => {
        var user = {
            username: req.body.username,
            password: crypto.createHash('sha1').update(req.body.password).digest('hex')
        }

        var users = db.collection('users');
        users.find({ username: req.body.username }).toArray((err, result) => {
            if (result.length > 0) {
                res.redirect('/register?error=exists')
            } else {
                users.insert(user, (err, result) => {
                    req.session.user = user
                    res.redirect('/')
                });
            }
        })
    })
}