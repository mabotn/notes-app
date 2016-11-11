module.exports = (app, app_path, db, ObjectId) => {
    var notes = db.collection('notes');

    app.get('/edit/:note_id', (req, res) => {
        if (req.session.user) {
            res.sendFile(app_path + '/views/edit.html')
        } else {
            res.redirect('/login')
        }
    })

    app.get('/edit/:note_id/json', (req, res) => {
        var note_id = new ObjectId(req.params.note_id)

        notes.find({ _id: note_id }).toArray((err, result) => {
            res.send(result[0])
        })
    })

    app.post('/edit/:note_id', (req, res) => {
        var note_id = new ObjectId(req.params.note_id)
        var note = req.body

        notes.update({ _id: note_id }, { $set: note }, (err, result) => {
            res.redirect('/notes')
        })
    })
}