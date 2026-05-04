const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.use((req, res) => {
  res.status(404).render('404', { url: req.url })
})

app.listen(3003, () => {
  console.log('exercise4 running on port 3003')
})
