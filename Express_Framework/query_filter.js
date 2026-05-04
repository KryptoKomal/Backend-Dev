const express = require('express')
const app = express()

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  { id: 4, name: 'Alicia', email: 'alicia@example.com' }
]

app.get('/users', (req, res) => {
  let result = users

  if (req.query.name) {
    result = users.filter(u => u.name.toLowerCase().includes(req.query.name.toLowerCase()))
  }

  res.json(result)
})

app.listen(3000, () => {
  console.log('exercise1 running on port 3000')
})
