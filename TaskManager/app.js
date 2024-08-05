class Task {
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

class TaskManager {
  constructor() {
    localStorage.getItem('notes') === '' && localStorage.removeItem('notes');
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.loadTasks();
  }

  addTask(description) {
    const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    const task = new Task(id, description);
    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  editTask(id) {
    let newDescription = '';
    while (!newDescription) {
      newDescription = prompt('New Task description');
      if (!newDescription) {
        alert('Description must be provided');
      } else {
        break;
      }
    }
    this.tasks.forEach(
      (task) =>
        (task.description = id === task.id ? newDescription : task.description)
    );
    this.saveTasks();
    this.renderTasks();
  }

  toggleTaskComplete(id) {
    let task = this.tasks.find((task) => task.id === id);
    task = new Task(task.id, task.description, task.completed);
    if (task) {
      task.toggleComplete();

      this.tasks.forEach((task_) => {
        task_.completed = id === task_.id ? task.completed : task_.completed;
      });
      this.saveTasks();
      this.renderTasks();
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    this.renderTasks();
  }

  renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    this.tasks.forEach((task) => {
      const item = document.createElement('li');
      item.textContent = task.description;
      item.className = task.completed ? 'completed' : '';
      item.addEventListener('click', () => this.toggleTaskComplete(task.id));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteTask(task.id);
      });

      item.appendChild(deleteButton);

      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editTask(task.id);
      });

      item.appendChild(editButton);

      taskList.appendChild(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager();

  document.getElementById('add-task').addEventListener('click', () => {
    const newTask = document.getElementById('new-task').value;
    if (newTask) {
      taskManager.addTask(newTask);
      document.getElementById('new-task').value = '';
    }
  });
});
