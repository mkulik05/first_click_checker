const express = require('express')
const app = express()
var http = require('http').createServer(app);
var io = require ('socket.io')(http);
const port = 80

app.use('/static', express.static('code'));
app.get('/', (req, res) => {
  res.redirect("/static/index.html")
  console.log("get")
});
let server_data={'sequence':[], 'score':{}, 'ready_to_redirect':false, 'delay':2000}
sequence=[] 
score={} 
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
  socket.on('get_data', (_msg) => {
    io.emit('data', server_data);
  });

  socket.on('delay', (delay) => {
    server_data['delay'] = delay
  });

  socket.on('del_data', (name) => {
    sequence.splice(0, 1);
    server_data["sequence"] = sequence
  })
  // socket.on('results', (scores) => {

  //     server_data["ready_to_redirect"]=true

    
  // })
  socket.on('change_score', (scores) => {
    console.log("change")
    console.log(scores)
    console.log(typeof scores)
      score=scores
      server_data["ready_to_redirect"]=true
      server_data["score"] = score
      sequence=[]
      server_data["sequence"]=sequence
    
  })
  socket.on('null', (_) => {
    server_data["sequence"]=[]
    server_data["ready_to_redirect"]=false
  })


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/data', (req, res) => {
   res.send(JSON.stringify(server_data));
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
