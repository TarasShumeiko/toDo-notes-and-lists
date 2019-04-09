const path = window.location.pathname;
const id = path.substring(14);

const editList = document.getElementById('edit-list');
const deleteList = document.getElementById('delete-list');

editList.href = `/editList:${id}`;
deleteList.href = `/deleteList:${id}`;

const lists = document.getElementsByClassName('lists');
for (let i = 0; i < lists.length; i++) {
  if (lists[i].id === id) {
    lists[i].style.display = 'block';
  }
}

const allItems = document.getElementsByClassName('all-list-items');
const allItemsFragment = document.createDocumentFragment();
for (let i = 0; i < allItems.length; i++) {
  let allItemsText = allItems[i].innerText;
  let allSortedItems = allItemsText.split(',');
  for (let i = 0; i < allSortedItems.length; i++) {
    let div = document.createElement('div');
    div.innerText = allSortedItems[i];
    allItemsFragment.appendChild(div);
  }
  allItems[i].innerText = '';
  allItems[i].appendChild(allItemsFragment);
}

const doneItems = document.getElementsByClassName('done-list-items');
const doneItemsFragment = document.createDocumentFragment();
for (let i = 0; i < doneItems.length; i++) {
  let doneItemsText = doneItems[i].innerText;
  let doneSortedItems = doneItemsText.split(',');
  for (let i = 0; i < doneSortedItems.length; i++) {
    let div = document.createElement('div');
    div.innerText = doneSortedItems[i];
    doneItemsFragment.appendChild(div);
  }
  doneItems[i].innerText = '';
  doneItems[i].appendChild(doneItemsFragment);
}
