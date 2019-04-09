const path = window.location.pathname;
const id = path.substring(14);

const editNote = document.getElementById('edit-note');
const deleteNote = document.getElementById('delete-note');

editNote.href = `/editNote:${id}`;
deleteNote.href = `/deleteNote:${id}`;

const notes = document.getElementsByClassName('notes');
for (let i = 0; i < notes.length; i++) {
  if (notes[i].id === id) {
    notes[i].style.display = 'block';
  }
}
