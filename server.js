const express = require('express')
const app = express()
var http = require('http').createServer(app);
var io = require ('socket.io')(http);
const port = 5000
app.use('/static', express.static('code'));
app.get('/', (req, res) => {
  res.redirect("/static/index.html")
  console.log("get")
});
let server_data={'sequence':[], 'score':{}, 'ready_to_redirect':false}
sequence=[] 
score={} 
app.post('/data', (req, res) => {
  res.send('POST request to the homepage');
  console.log("post")
  if (!sequence.includes(req.query.name)) {
  sequence.push(req.query.name)
  server_data["sequence"] = sequence
  }
  res.end()
});
app.post('/del_data', (req, res) => {
  sequence.splice(0, 1);
  //console.log(sequence)
  server_data["sequence"] = sequence
  res.end()
});
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('user_name', (name) => {
    console.log('message: ' + name);
    if (!sequence.includes(name)) {
      sequence.push(name)
      server_data["sequence"] = sequence
      }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post('/null', (req, res) => {
  sequence=[]
  server_data["sequence"]=sequence
  server_data["ready_to_redirect"]=false
  res.end()
});

app.post('/change_score', (req, res) => {

  if (typeof req.query.name !="undefined") {
    score[req.query.name]=req.query.score
    server_data["ready_to_redirect"]=true
    server_data["score"] = score
    sequence=[]
    server_data["sequence"]=sequence
  }

  res.end()
});

app.get('/data', (req, res) => {
   res.send(JSON.stringify(server_data));
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
