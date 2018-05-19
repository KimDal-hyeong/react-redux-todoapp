const express = require('express');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./database.json');
const db = low(adapter);

const defaultData = {
  todos: [
    {
      id: 1,
      title: '리액트 조지기',
      completed: false,
    }
  ]
};
db.defaults(defaultData).write();

app.use(express.json());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// todo 가져오기
app.get('/todos', function(req, res) {
  const data = db.get('todos').value();
  const todos = data.filter((todo) => {
    const filter = req.query.filter;
    const completed = todo.completed;
    if (filter === 'All') {
      return true;
    } else if (filter === 'Active' && completed === false) {
      return true;
    } else if (filter === 'Completed' && completed === true) {
      return true;
    }
  });
  res.send(todos);
});

// todo 추가하기
app.post('/todos', function(req, res) {
  db.get('todos').push({
    id: Date.now(),
    title: req.body.title,
    completed: false
  }).write();
  res.sendStatus(200);
});

// todo 삭제하기
app.del('/todos/:id', function(req, res) {
  db.get('todos')
    .remove({ id: Number.parseInt(req.params.id, 10) })
    .write();
  res.sendStatus(200);
});

// todo completed 변경하기
app.put('/todos/:id/completed', function(req, res) {
  console.log(req.params.id, req.body.completed);
  db.get('todos')
    .find({ id: Number.parseInt(req.params.id, 10) })
    .set('completed', req.body.completed )
    .write();
  res.sendStatus(200);
});

// todo title 변경하기
app.put('/todos/:id/title', function(req, res) {
  console.log(req.params.id, req.body.title);
  db.get('todos')
    .find({ id: Number.parseInt(req.params.id, 10) })
    .set('title', req.body.title )
    .write();
  res.sendStatus(200);
});

app.listen(4000, function () {
  console.log('4000번 포트로 서버 켜짐')
});