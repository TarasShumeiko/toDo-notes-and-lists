function deleteNote() {

  const path = window.location.pathname;
  const id = path.substring(12);

  return fetch(`/deleteNote${id}`, {method: 'DELETE'});

}
