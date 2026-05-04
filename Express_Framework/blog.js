const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))

let posts = [
  { id: 1, title: 'First Post', body: 'Hello this is my first blog post.' },
  { id: 2, title: 'Second Post', body: 'This is another post on the blog.' }
]

let nextId = 3

app.get('/', (req, res) => {
  res.render('blog_index', { posts: posts })
})

app.get('/posts/new', (req, res) => {
  res.render('blog_new', { error: '' })
})

app.post('/posts', (req, res) => {
  const { title, body } = req.body

  if (!title || !body) {
    return res.render('blog_new', { error: 'Title and body are required' })
  }

  posts.push({ id: nextId++, title: title, body: body })
  res.redirect('/')
})

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id))
  if (!post) {
    return res.status(404).send('Post not found')
  }
  res.render('blog_post', { post: post })
})

app.listen(3005, () => {
  console.log('exercise6 running on port 3005')
})
