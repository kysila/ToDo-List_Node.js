const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://step-notes:Test-connection1234@cluster0-catm5.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let notes, lists;

client.connect(err => {
  console.log('DB connection error: ', err);
  const db = client.db("notes");
  notes = db.collection("notes");
  lists = db.collection("lists")
  // client.close(); // it's unnecessary to use it
});

// * GET HOME PAGE WITH ALL NOTES AND LISTS
// *------------------------------------------------------------------
router.get('/', async (req, res, next) => {
  const nts = await notes.find({});
  const lts = await lists.find({});
  let notesData = [];
  let listsData = [];
  await nts.forEach(item => {
    notesData.push(item);
  });

  await lts.forEach(item => {
    listsData.push(item);
  });

  res.render('index', { notes: notesData, lists: listsData });
});

router.get('/notes', (req, res) => {
  res.render('notes');
});
// *------------------------------------------------------------------

// *  CREATE NOTE
// *------------------------------------------------------------------
router.post('/api/notes', async(req, res, next) => {
  const {id, title, text} = req.body;

  const data = await notes.insertOne({id, title, text});
  res.json(JSON.stringify({
    status: !!data.insertedId
  }))
});
// *------------------------------------------------------------------

//* SINGLE NOTE
// *------------------------------------------------------------------
router.get('/notes/:id', async(req, res, next) => {
  const id = +req.params.id;
  const note = await notes.findOne({id});
  res.render('note', { note });
});
// *------------------------------------------------------------------


// * EDIT NOTE
// *------------------------------------------------------------------
router.put('/api/notes/:id', async(req, res, next) => {
  const id = +req.params.id;
  const {title, text} = req.body;

  const data = await notes.updateOne(
      {id: +id},
      {$set: {title, text}}
  );
  res.json(JSON.stringify({
    status: !!data.modifiedCount
  }))
});
// *------------------------------------------------------------------

//* DELETE NOTE
// *------------------------------------------------------------------
router.delete('/api/notes/:id', async(req, res, next) => {
  const id = +req.params.id;

  const data = await notes.deleteOne({id: +id});
  res.json(JSON.stringify({
    status: !!data.deletedCount
  }))
});
// *------------------------------------------------------------------




router.get('/lists', (req, res) => {
  res.render('lists');
});
// *------------------------------------------------------------------

// *  CREATE LIST
// *------------------------------------------------------------------
router.post('/api/lists', async(req, res, next) => {
  const {id, title, text} = req.body;

  const data = await lists.insertOne({id, title, text, todos: []});
  res.json(JSON.stringify({
    status: !!data.insertedId
  }))
});
// *------------------------------------------------------------------

//* SINGLE LIST
// *------------------------------------------------------------------
router.get('/lists/:id', async(req, res, next) => {
  const id = +req.params.id;
  const list = await lists.findOne({id});

  if(!list) {
    return res.redirect('/');
  }

  res.render('list', { list });
});

router.get('/lists/:id/todo', async(req, res, next) => {
  const id = +req.params.id;
  const todo = await lists.findOne({id});
  res.render('todo', { todo: todo.todos });
});
// *------------------------------------------------------------------


// * EDIT LIST
// *------------------------------------------------------------------
router.put('/api/lists/:id', async(req, res, next) => {
  const id = +req.params.id;
  const {title, text, todos = []} = req.body;

  const tds = todos.map(a => ({ checked: a.checked, text: a.text }));

  const data = await lists.updateOne(
    {id: +id},
    {$set: {title, text, todos: tds}}
  );

  res.json(JSON.stringify({
    status: !!data.modifiedCount
  }))
});

// *------------------------------------------------------------------

//* DELETE LIST
// *------------------------------------------------------------------
router.delete('/api/lists/:id', async(req, res, next) => {
  const id = +req.params.id;

  const data = await lists.deleteOne({id: +id});
  res.json(JSON.stringify({
    status: !!data.deletedCount
  }))
});
// *------------------------------------------------------------------

module.exports = router;