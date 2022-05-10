const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
app.set('view engine', 'pug')
app.use(express.static('public'));

const validateColor = color => ['red', 'yellow', 'green', 'blue', 'purple'].find(c => c == color)
const defaultColor = 'green'

app.get('/settings', (req, res) => {
  const color = validateColor(req.query?.color) || validateColor(req.cookies?.color) || defaultColor
  res.cookie('color', color).redirect('/')
})

app.get('/', (req, res) => {
  function getPrintSelected(selectedColor) {
    return (function printSelected(color) {
      return (color == this.color) ? '(selected)' : ''
    }).bind({ color: selectedColor })
  }
  const color = validateColor(req.cookies?.color) || defaultColor
  if (!validateColor(req.cookies?.color)) {
    res.clearCookie('color')
  }
  res.render('root', {
    color,
    printSelected: getPrintSelected(color),
  })
})

app.listen(8080)
