module.exports = (app, app_path, db) => {
    app.get('/create', (req, res) => {
        if (req.session.user) {
            res.sendFile(app_path + '/views/create.html')
        } else {
            res.redirect('login')
        }
    })

    app.post('/create', (req, res) => {
        var notes = db.collection('notes');
        var note = req.body
        note.author = req.session.user._id

        notes.insert(note, (err, result) => {
            res.redirect('notes')
        })
    })
}