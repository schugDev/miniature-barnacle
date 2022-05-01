const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

loadEventListeners();
loadStoredTasks();

function loadStoredTasks() {
    if (JSON.parse(localStorage.getItem('tasks')) !== null) {


        Array.from(JSON.parse(localStorage.getItem('tasks'))).forEach(element => {
            console.log(element);
            const li = document.createElement('li');
            li.className = 'collection-item'
            li.appendChild(document.createTextNode(element));

            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            taskList.appendChild(li);
        });
    }
}

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    clearButton.addEventListener('click', clearTasks);
    taskList.addEventListener('click', removeTask);
    filter.addEventListener('keyup', filterTasks)
}

function filterTasks(e) {
    console.log(e);
    let childArray = taskList.childNodes;
    let idx = 0;
    document.querySelectorAll('.collection-item').forEach(
        function (element) {
            if (filter.value !== '' && !element.textContent.includes(filter.value)) {
                element.style.display = 'none';
            } else {
                element.style.display = 'block';
            }
        }
    )
    console.log
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm(`Really want to remove task: ${e.target.parentElement.parentElement.textContent}`)) {
            taskList.removeChild(e.target.parentElement.parentElement);
            let tasks = [];
            tasks = JSON.parse(localStorage.getItem('tasks'));
            //console.log(tasks);
            tasks.splice(tasks.indexOf(e.target.parentElement.parentElement.textContent), 1);
            //console.log(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

    }

}

function clearTasks(e) {
    console.log("clear tasks");
    let childArray = Array.from(taskList.children);

    for (let index = 0; index < childArray.length; index++) {
        taskList.removeChild(childArray[index]);
    }
    let tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function storeTasksInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        console.log('nothing in local storage. Create array')
        tasks = [];
    } else {
        console.log('found tasks object in localStorake')
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(tasks);
    }
    tasks.app
    tasks.push(task);
    console.log(tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('no task entered');
        return;
    }

    const li = document.createElement('li');
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTasksInLocalStorage(taskInput.value);
    taskInput.value = '';

    e.preventDefault();
}