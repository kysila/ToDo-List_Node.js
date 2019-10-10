if (document.querySelector('#create-notes-form')) {
  document.querySelector('#create-notes-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let data = collectFormData(this);
    customFetch('/api/notes',
      'POST',
      {
        ...data,
        id: Date.now()
      }
    )
  });
}

if (document.querySelector('#create-lists-form')) {
  document.querySelector('#create-lists-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let data = collectFormData(this);

    customFetch('/api/lists',
      'POST',
      {
        ...data,
        id: Date.now()
      }
    )
  });
}

if (document.getElementById('single-note-page') && document.querySelector('#edit-popup form')) {
  document.querySelector('#edit-popup form').addEventListener('submit', function (e) {
    e.preventDefault();
    let data = collectFormData(this);
    customFetch(`/api/notes/${data.id}`,
      'PUT',
      {
        ...data
      }
    )
  });
}


if (document.getElementById('single-list-page') && document.querySelector('#edit-popup form')) {

  document.querySelector('#todo-add').addEventListener('click', function () {
    const addTo = document.querySelector('#edit-popup .todo-list');

    addTo.appendChild( createNode(`
        <div class="form-group input-group">
            <span role="button" class="close btn input-group-text">
                <input type="checkbox" data-name="checked" style="cursor:pointer;" value="">
            </span>
            <input type="text" class="form-control" data-name="text" required>
            <div class="input-group-append" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">
                 <span role="button" class="close btn btn-danger" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                 </span>
            </div>
        </div>
    `));
  });

  document.querySelector('#edit-popup form').addEventListener('submit', function (e) {
    e.preventDefault();
    let data = collectFormData(this);
    let todos = collectDataFromTodoList(this.querySelector('.todo-list'));

    customFetch(`/api/lists/${data.id}`,
      'PUT',
      {
        ...data,
        todos
      }
    )
  });
}

if (document.getElementById('single-note-page')) {

  document.querySelector('[data-edit]').addEventListener('click', (e) => {
    editBtnHandler(e.target.dataset.edit)
  });

  document.querySelector('[data-delete]').addEventListener('click', (e) => {
    customFetch(
      `/api/notes/${+e.target.dataset.delete}`,
      'DELETE'
    )
  })
}

if (document.getElementById('single-list-page')) {

  document.querySelector('[data-edit]').addEventListener('click', (e) => {
    editBtnHandler(e.target.dataset.edit)
  });

  document.querySelector('[data-delete]').addEventListener('click', (e) => {
    customFetch(
      `/api/lists/${+e.target.dataset.delete}`,
      'DELETE'
    )
  })
}

async function customFetch(endpoint, method, body) {
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  const answer = JSON.parse(json);

  if (answer.status) {
    window.location = '/';
  } else {
    alert('Something goes wrong! =(')
  }
}

function collectFormData(element) {
  let data = {};
  element.querySelectorAll('[name]').forEach(field => {
    if (field.value.trim()) {
      if (data[field.name]) {
        data[field.name] = Array.isArray(data[field.name]) ? data[field.name] : [data[field.name]];
        data[field.name].push(field.value);
      } else {
        data[field.name] = field.value;
      }
    }
  });
  return data;
}

function collectDataFromTodoList(todo) {
    const data = [];

    todo.querySelectorAll('.form-group').forEach((group) => {
        const fieldData = {};

        group.querySelectorAll('[data-name]').forEach(function(field){

            fieldData[field.dataset.name] = field.value || field.checked;
        });

        data.push(fieldData);
    });

    return data;
}

function editBtnHandler(id) {
  const popup = document.getElementById('edit-popup');
  const card = document.querySelector(`[data-id="${id}"]`);

  popup.querySelector('[name="title"]').value = card.querySelector('h5').innerText;
  popup.querySelector('[name="text"]').value = card.querySelector('p').innerText;
  popup.querySelector('[name="id"]').value = id;

  showPopup('edit-popup');
}

document.querySelectorAll('.popup').forEach(element => {
  element.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      hidePopup(element.id)
    }
  })
});

function showPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';
}

function hidePopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'none';
}

function createNode(html){
  const template =  document.createElement('template');
  template.innerHTML = html;
  return template.content.cloneNode(true);
}
