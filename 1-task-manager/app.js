// clase Task y sus métodos
class Task {
  //constructor para crear nuevas instancias
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }

  // método para completar o descompletar tarea

  toggleComplete() {
    this.completed = !this.completed;
    console.log(this);
  }
}

// función manejador de tareas

class TaskManager {
  // método constructor
  constructor() {
    this.tasks = this.loadTasks();
    this.renderTasks();
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

  toggleTaskComplete(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.toggleComplete();
      this.saveTasks();
      this.renderTasks();
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.map(
      (task) => new Task(task.id, task.description, task.completed)
    ); // se cambió el flujo para poder usar la función de completar tarea en la clase Task, ya que al traer las tareas del local storage pierden el método toggleComplete
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
        e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
        this.deleteTask(task.id);
      });

      item.appendChild(deleteButton);
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
