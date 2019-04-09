function submitForm() {

  const title = document.getElementById('input-title');
  const text = document.getElementById('input-text');

  if (title.value.length !== 0 || text.value.length !== 0) {

    const post = {
      title: title.value,
      text: text.value,
      id: `${Math.random()}`.substring(2)
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    return fetch('/notes', options);

  }
}
