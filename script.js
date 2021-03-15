const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter');
const changeBtn = document.querySelector('.change-theme-btn');

document.addEventListener('DOMContentLoaded', getTodos)
//ADD TODO
todoBtn.addEventListener('click', addTodo);

function addTodo(event){    
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add("light-todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    completedButton.classList.add('light-completed-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    trashButton.classList.add('light-trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

//DELET AND CHECK TODO
todoList.addEventListener('click', deletCheck);

function deletCheck(e){
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('out');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        });
    }

    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        saveLocalStatus(todoInput.value);
    }
    
}

//FILTER
filterOption.addEventListener('click', filterTodo);

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
            break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
            break;
            case 'uncompleted':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                }else{
                    todo.style.display = 'flex';
                }
            break;
        }
    })
}

//SAVING
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.classList.add("light-todo");
    
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        completedButton.classList.add('light-completed-btn');
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        trashButton.classList.add('light-trash-btn');
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveLocalStatus(todo){
    let check;
    if(localStorage.getItem('check') === null){
        check = [];
    }else{
        todos = JSON.parse(localStorage.getItem('check'));
    }
    check.push(todo);
    localStorage.setItem('check', JSON.stringify(check));
    }

// CHANGE THEME

changeBtn.onclick = function changeTheme(){
    const todos = todoList.childNodes;
    
    const body = document.querySelector('.body');
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');

    const header = document.querySelector('.header');
    header.classList.remove('light-header');
    header.classList.add('dark-header');

    const changeButton = document.querySelector('.change-theme-btn');
    changeButton.classList.remove('light-change-btn');
    changeButton.classList.add('dark-change-btn');

    const hr = document.querySelector('.hr');
    hr.classList.remove('light-hr');
    hr.classList.add('dark-hr');

    const plusBtn = document.querySelector('.todo-btn');
    plusBtn.classList.remove('light-btn');
    plusBtn.classList.add('dark-btn');

    const todoInput = document.querySelector('.todo-input');
    todoInput.classList.remove('light-input');
    todoInput.classList.add('dark-input');

    const select = document.querySelector('.select');
    select.classList.remove('light-select');
    select.classList.add('dark-select');

    const filterTodo = document.querySelector('.filter');
    filterTodo.classList.remove('light-filter');
    filterTodo.classList.add('dark-filter');  
    }
