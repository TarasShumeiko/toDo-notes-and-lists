const {uri, dbName} = require('./config');
const MongoClient = require('mongodb').MongoClient;


exports.checkConnection = async () => {
  const connection = await MongoClient.connect(uri, {useNewUrlParser: true});
  console.log('connected');
  connection.close();
};

exports.getNotes = async () => {
  let client = await MongoClient.connect(uri, {useNewUrlParser: true});
  console.log('connected successfully to notes');
  const currentDb = client.db('todo');
  const notesCol = currentDb.collection('notes');
  const notes = await notesCol.find({}).toArray();
  client.close();
  return notes;
};
exports.getLists = async () => {
  let client = await MongoClient.connect(uri, {useNewUrlParser: true});
  console.log('connected successfully to lists');
  const currentDb = client.db('todo');
  const listsCol = currentDb.collection('lists');
  const lists = await listsCol.find({}).toArray();
  client.close();
  return lists;
};

exports.addNote = async (note) => {
  let client;
  try {
    client = await MongoClient.connect(uri, {useNewUrlParser: true});
    const currentDb = client.db(dbName);
    const notesCol = currentDb.collection('notes');
    const addedNote = await notesCol.insertOne(note);
    console.log('note was added')
  } catch (err) {
    console.log(err);
  }
  client.close();
};
exports.addList = async (list) => {
  let client;
  try {
    client = await MongoClient.connect(uri, {useNewUrlParser: true});
    const currentDb = client.db(dbName);
    const listsCol = currentDb.collection('lists');
    const addedList = await listsCol.insertOne(list);
    console.log('list was added')
  } catch (err) {
    console.log(err);
  }
  client.close();
};

exports.selectNote = async (id) => {
  let client = await MongoClient.connect(uri, {useNewUrlParser: true});
  console.log('note was selected');
  const currentDb = client.db('todo');
  const notesCol = currentDb.collection('notes');
  const note = await notesCol.find({id: id}).toArray();
  client.close();
  return note;
};
exports.selectList = async (id) => {
  let client = await MongoClient.connect(uri, {useNewUrlParser: true});
  console.log('list was selected');
  const currentDb = client.db('todo');
  const listsCol = currentDb.collection('lists');
  const list = await listsCol.find({id: id}).toArray();
  client.close();
  return list;
};

exports.updateNote = async (id, newTitle, newText) => {
  let client;
  try {
    client = await MongoClient.connect(uri, {useNewUrlParser: true});
    const currentDb = client.db('todo');
    const notesCol = currentDb.collection('notes');
    const updatedNote = await notesCol.updateOne({id: id}, {$set: {title: newTitle, text: newText}});
    console.log('note was updated');
  } catch (err) {
    console.log(err)
  }
  client.close();
};
exports.updateList = async (id, newTitle, allNewListItems, newDoneListItems) => {
  let client;
  try {
    client = await MongoClient.connect(uri, {useNewUrlParser: true});
    const currentDb = client.db('todo');
    const listsCol = currentDb.collection('lists');
    const updatedList = await listsCol.updateOne({id: id}, {$set: {title: newTitle, allListItems: allNewListItems, doneListItems: newDoneListItems}});
    console.log('list was updated');
  } catch (err) {
    console.log(err)
  }
  client.close();
};

exports.deleteNote = async (id) => {
  let client;
  try {
    client = await MongoClient.connect(uri, {useNewUrlParser: true});
    const currentDb = client.db('todo');
    const notesCol = currentDb.collection('notes');
    const deletedNote = await notesCol.deleteOne({id: id});
    console.log('note was deleted');
  } catch (err) {
    console.log(err)
  }
  client.close();
};
exports.deleteList = async (id) => {
  let client;
  try {
    client = await MongoClient.connect(uri, {useNewUrlParser: true});
    const currentDb = client.db('todo');
    const listsCol = currentDb.collection('lists');
    const deletedList = await listsCol.deleteOne({id: id});
    console.log('list was deleted');
  } catch (err) {
    console.log(err)
  }
  client.close();
};
