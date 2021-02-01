const express = require('express');
const app = express()
const http = require('http').Server(app);
const path = require("path")
const httpPort = 80
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get('/test',(req, res) => {
  res.sendFile(path.join(__dirname, 'public/test.html'))
})
http.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`)
})