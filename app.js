const express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser');

const app = express();
db.checkConnection();


app.set('views','./views');
app.set('view engine','pug');
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


let allNotes = [];
let allLists = [];


app.get('/', async function(req, res) {
  res.render('index', {
    title: 'Notes and Lists',
    header: 'Notes and Lists',
    url: ['/notes', '/lists', '/selectedNote', '/selectedList'],
    noteItems: allNotes,
    listItems: allLists
  });
});

app.get('/notes', async function(req, res) {
  const notes = await db.getNotes();
  res.render('notes', {title: 'Note', header: 'Create new note', url: '/', todoNotes: notes});
});

app.post('/notes', async function(req, res) {
  console.log(req.body);
  allNotes.push(req.body);
  await db.addNote(req.body);
  const notes = await db.getNotes();
  res.render('notes', {title: 'Note', header: 'Create new note', url: '/', todoNotes: notes});
});

app.get('/lists', async function(req, res) {
  const lists = await db.getLists();
  res.render('lists', {title: 'List', header: 'Create new list', url: '/', todoLists: lists});
});

app.post('/lists', async function(req, res) {
  console.log(req.body);
  allLists.push(req.body);
  await db.addList(req.body);
  const lists = await db.getLists();
  res.render('lists', {title: 'Edit note', header: 'Create new list', url: '/', todoLists: lists});
});

app.get(`/selectedNote:id`, async function(req, res) {
  res.render('selected-note', {title: 'Note', url: '/', noteItems: allNotes});
});

app.get(`/selectedList:id`, async function(req, res) {
  res.render('selected-list', {title: 'List', url: '/', listItems: allLists});
});

app.get(`/editNote:id`, async function(req, res) {
  const notes = await db.getNotes();
  console.log(allNotes);
  res.render('edit-note', {title: 'Edit note', header: 'Edit note', url: '/', todoNotes: notes});
});

app.put(`/editNote:id`, async function(req, res) {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newText = req.body.text;
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].id === id) {
      allNotes[i].title = newTitle;
      allNotes[i].text = newText;
    }
  }
  await db.updateNote(id, newTitle, newText);
});

app.get('/editList:id', async function(req, res) {
  const lists = await db.getNotes();
  console.log(allLists);
  res.render('edit-list', {title: 'Edit list', header: 'Edit list', url: '/', todoLists: lists});
});

app.put(`/editList:id`, async function(req, res) {
  const id = req.params.id;
  const newTitle = req.body.title;
  const allNewListItems = req.body.allListItems;
  const newDoneListItems = req.body.doneListItems;
  for (let i = 0; i < allLists.length; i++) {
    if (allLists[i].id === id) {
      allLists[i].title = newTitle;
      allLists[i].allListItems = allNewListItems;
      allLists[i].doneListItems = newDoneListItems;
    }
  }
  await db.updateList(id, newTitle, allNewListItems, newDoneListItems);
});

app.get(`/deleteNote:id`, async function(req, res) {
  const notes = await db.getNotes();
  console.log(allNotes);
  res.render('delete-note', {title: 'Delete note', header: 'delete note ?', url: '/', todoNotes: notes});
});

app.delete(`/deleteNote:id`, async function(req, res) {
  const id = req.params.id;
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].id === id) {
      allNotes.splice(i, 1)
    }
  }
  await db.deleteNote(id);
});

app.get(`/deleteList:id`, async function(req, res) {
  const lists = await db.getLists();
  console.log(allLists);
  res.render('delete-list', {title: 'Delete list', header: 'delete list ?', url: '/', todoLists: lists});
});

app.delete(`/deleteList:id`, async function(req, res) {
  const id = req.params.id;
  for (let i = 0; i < allLists.length; i++) {
    if (allLists[i].id === id) {
      allLists.splice(i, 1)
    }
  }
  await db.deleteList(id);
});


app.listen(3000);