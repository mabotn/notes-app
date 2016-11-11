module.exports = (app, app_path, db, ObjectId) => {
    var notes = db.collection('notes');

    app.get('/delete/:note_id', (req, res) => {
        if (req.session.user) {
            res.sendFile(app_path + '/views/delete.html')
        } else {
            res.redirect('login')
        }
    })

    app.post('/delete/:note_id', (req, res) => {
        var note_id = new ObjectId(req.params.note_id)

        notes.remove({ _id: note_id }, (err, result) => {
            res.redirect('/notes')
        })
    })
}