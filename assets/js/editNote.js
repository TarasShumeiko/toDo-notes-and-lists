function editNote() {

  const title = document.getElementById('input-title');
  const text = document.getElementById('input-text');

  const path = window.location.pathname;
  const id = path.substring(10);

  if (title.value.length !== 0 || text.value.length !== 0) {

    const post = {
      title: title.value,
      text: text.value
    };

    const options = {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    return fetch(`/editNote${id}`, options);

  }
}
