const express = require('express')
const courses = require('./data')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hey there!')
})

app.get('/api/courses', (req, res) => {
  res.status(200).send(courses)
})

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length++,
    name: req.body.name
  }

  courses.push(course)
  res.status(201).send(course)
})

app.get('/api/courses/:id', (req, res) => {
  const { id } = req.params
  const course = courses.find(course => course.id === parseInt(id))
  if (!course) res.status(404).send('course not found')
  res.status(200).send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))
