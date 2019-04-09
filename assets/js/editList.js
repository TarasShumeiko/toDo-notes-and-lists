function cleanField(e) {
  e.preventDefault();

  const input = document.getElementById('input-text');
  const form = document.getElementById('my-form');

  if (input.value.length !== 0) {
    const event = new Event('submit');
    form.dispatchEvent(event);
    input.value = null
  }
}


let count = 0;
function addItem(e) {
  e.preventDefault();
  count++;

  const inputText = document.getElementById('input-text');
  const list = document.getElementById('list');

  const listItems = document.createElement('div');
  listItems.className = 'list-items';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = count;
  input.name = inputText.value;
  input.className = 'mr-2';
  input.addEventListener( 'change' , function() {
    const tasks = document.getElementById('completed-tasks');
    if (this.checked) {
      const div = document.createElement('div');
      div.innerText = this.name;
      div.className = this.id;
      tasks.appendChild(div);
    } else {
      $(`.${this.id}`).remove();
    }
  });

  const label = document.createElement('label');
  label.htmlFor = count;
  label.innerText = inputText.value;

  listItems.appendChild(input);
  listItems.appendChild(label);
  list.appendChild(listItems);
}


function editForm() {

  const inputTitle = document.getElementById('input-title');
  const allItems = document.getElementsByTagName('label');
  const doneItems = document.getElementById('completed-tasks');

  if (allItems.length !== 0 || inputTitle.value.length !== 0) {

    let allListItems = [];
    for (let i = 0; i < allItems.length; i++) {
      allListItems.push(allItems[i].innerText)
    }

    let doneListItems = [];
    for (let i = 0; i < doneItems.childNodes.length; i++) {
      doneListItems.push(doneItems.childNodes[i].innerText)
    }

    const path = window.location.pathname;
    const id = path.substring(10);

    const post = {
      title: inputTitle.value,
      allListItems: allListItems,
      doneListItems: doneListItems
    };

    const options = {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    return fetch(`/editList${id}`, options);

  }
}


function checkParams() {
  const name = $('#input-text').val();

  if(name.length !== 0) {
    $('#submit').removeAttr('disabled');
  } else {
    $('#submit').attr('disabled', 'disabled');
  }

  const list = document.getElementsByTagName('label');
  for (let i = 0; i < list.length; i++) {
    if(name !== list[i].innerText) {
      $('#submit').removeAttr('disabled');
    } else {
      $('#submit').attr('disabled', 'disabled');
    }
  }
}
