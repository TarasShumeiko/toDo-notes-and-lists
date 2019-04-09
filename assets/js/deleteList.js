function deleteList() {

  const path = window.location.pathname;
  const id = path.substring(12);

  return fetch(`/deleteList${id}`, {method: 'DELETE'});

}
