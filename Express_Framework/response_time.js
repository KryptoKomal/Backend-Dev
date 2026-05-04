const express = require('express')
const app = express()

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const time = Date.now() - start
    console.log(req.method + ' ' + req.url + ' took ' + time + 'ms')
  })
  next()
})

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.listen(3001, () => {
  console.log('exercise2 running on port 3001')
})
