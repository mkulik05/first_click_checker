const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 5000
app.use('/static', express.static('code'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
