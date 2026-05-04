const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))

app.get('/contact', (req, res) => {
  res.render('contact', { submitted: false, name: '', error: '' })
})

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.render('contact', { submitted: false, name: '', error: 'All fields are required' })
  }

  res.render('contact', { submitted: true, name: name, error: '' })
})

app.listen(3002, () => {
  console.log('exercise3 running on port 3002')
})
