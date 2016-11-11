module.exports = (app, app_path, db) => {
    app.get('/notes', (req, res) => {
        if (req.session.user) {
            res.sendFile(app_path + '/views/view.html')
        } else {
            res.redirect('login')
        }
    })

    app.post('/notes', (req, res) => {
        var notes = db.collection('notes');

        notes.find({ author: req.session.user._id }).toArray((err, result) => {
            res.send(result)
        })
    })
}