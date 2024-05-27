function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskItem = createTaskItem(taskText);
        document.getElementById('pendingTasksList').appendChild(taskItem);
        taskInput.value = '';
    }
}

function createTaskItem(taskText) {
    const taskItem = document.createElement('li');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    taskItem.appendChild(taskTextSpan);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(taskItem, taskTextSpan);
    actionsDiv.appendChild(editButton);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = () => completeTask(taskItem, taskTextSpan);
    actionsDiv.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => taskItem.remove();
    actionsDiv.appendChild(deleteButton);

    taskItem.appendChild(actionsDiv);
    return taskItem;
}

function editTask(taskItem, taskTextSpan) {
    if (taskItem.classList.contains('editable')) {
        taskTextSpan.textContent = taskItem.querySelector('input').value;
        taskItem.classList.remove('editable');
        taskItem.querySelector('input').remove();
    } else {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskTextSpan.textContent;
        taskItem.insertBefore(editInput, taskTextSpan);
        taskTextSpan.textContent = '';
        taskItem.classList.add('editable');
    }
}

function completeTask(taskItem, taskTextSpan) {
    taskItem.remove();
    taskItem.querySelector('button:nth-child(2)').remove(); // Remove complete button

    const completeDate = new Date().toLocaleString();
    const dateSpan = document.createElement('span');
    dateSpan.style.fontStyle = 'italic';
    dateSpan.style.marginLeft = '10px';
    dateSpan.textContent = ` (Completed: ${completeDate})`;

    taskTextSpan.appendChild(dateSpan);
    document.getElementById('completedTasksList').appendChild(taskItem);
}