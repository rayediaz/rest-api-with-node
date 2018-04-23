const express = require('express')
const app = express()

const utils = require('./utils')
const Db = require('./db')
const db = new Db()

app.use(express.json())


app.get('/', (req, res) => {
  res.status(200).send('Hey there!')
})

app.get('/api/songs', (req, res) => {
  db.connect()
  db.getSongs()
    .then(songs => res.status(200).send(songs))
})

app.post('/api/songs', (req, res) => {
  const { error } = utils.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let song = req.body

  db.connect()
  db.saveSong(song)
    .then(song => res.status(201).send(song))
})

app.put('/api/songs/:id', (req, res) => {
  const { id } = req.params
  const newSong = req.body

  const { error } = utils.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  db.connect()
  db.updateSong(id, newSong)
    .then(song => res.status(200).send(song))
})

app.delete('/api/songs/:id', (req, res) => {
  const { id } = req.params

  db.connect()
  db.deleteSong(id)
    .then(song => res.status(200).send(song))
})

app.get('/api/songs/:id', (req, res) => {
  const { id } = req.params
  db.connect()
  db.getSong(id)
    .then(song => res.status(200).send(song))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))
