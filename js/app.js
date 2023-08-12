/* app.js */
function addTask() {
    const taskNameInput = document.getElementById("taskNameInput");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");
    const taskList = document.getElementById("taskList");
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <span>${taskName} (added at ${formattedDate})</span>
        <p>${taskDescription}</p>
        <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(taskItem);

    taskNameInput.value = "";
    taskDescriptionInput.value = "";

    // Save the tasks to local storage
    saveTasksToLocalStorage();
}

function toggleTask(checkbox) {
    const taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }

    // Save the tasks to local storage
    saveTasksToLocalStorage();
}

function removeTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();

    // Save the tasks to local storage
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = [];
    for (const taskItem of taskList.children) {
        const taskText = taskItem.querySelector('span').innerText;
        const taskDescription = taskItem.querySelector('p').innerText;
        tasks.push({ name: taskText, description: taskDescription });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const taskList = document.getElementById("taskList");
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        for (const task of tasks) {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <input type="checkbox" onchange="toggleTask(this)">
                <span>${task.name}</span>
                <p>${task.description}</p>
                <button onclick="removeTask(this)">Remove</button>
            `;
            taskList.appendChild(taskItem);
        }
    }
}

// Load tasks from local storage on page load
loadTasksFromLocalStorage();
